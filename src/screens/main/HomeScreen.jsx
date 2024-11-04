import React, { useEffect, useState } from 'react'
import { Facebook } from 'react-content-loader/native'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Footer, ScreenWapper, Thread } from '../../components'
import { useLanguage, useTheme } from '../../contexts'
import threadService from '../../services/threadServices'
import userService from '../../services/userServices'
import { setUser, showToast } from '../../store/slices'
import { clearThreads, setThreads } from '../../store/slices/threadSlice'
import { wp } from '../../utils'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const threads = useSelector(state => state.threads.threads)
    const hasMore = useSelector(state => state.threads.hasMore)

    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)

    const fetchThreads = async () => {
        if (loading || !hasMore) return
        setLoading(true)

        try {
            const response = await threadService.getNewFeed(page)
            const { data, is_success, metadata } = response

            if (is_success) {
                dispatch(
                    setThreads({
                        threads: data.filter(
                            thread => !threads.some(t => t.id === thread.id)
                        ),
                        hasMore: metadata.current_page < metadata.total_page
                    })
                )
            } else {
                dispatch(
                    showToast({
                        message: t('error.fetchFailed'),
                        type: 'error'
                    })
                )
            }
        } catch (error) {
            dispatch(showToast({ message: error.message, type: 'error' }))
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        dispatch(clearThreads())
        setPage(1)
        await fetchThreads()
        setRefreshing(false)
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            const userResponse = await userService.getInfo()
            dispatch(setUser(userResponse.data))
        }
        getCurrentUser()
    }, [])

    useEffect(() => {
        fetchThreads()
    }, [page, refreshing])

    const loadMoreThreads = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    // const handleThreadPress = thread => {
    //     navigation.navigate('ThreadDetail', { threadId: thread.id })
    // }

    const handleProfileNavigation = userId => {
        navigation.navigate('UserProfile', { userId: userId })
    }

    if (loading && threads.length === 0) {
        return (
            <ScreenWapper
                styles={[
                    styles.container,
                    {
                        borderColor: currentColors.background,
                        backgroundColor: currentColors.background
                    }
                ]}
            >
                <FlatList
                    data={[...Array(10)]}
                    renderItem={({ index }) => <Facebook key={index} />}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </ScreenWapper>
        )
    }

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <FlatList
                data={threads}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Thread
                        thread={item}
                        loading={loading}
                        onGoToProfile={handleProfileNavigation}
                    />
                )}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreThreads}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    <Footer
                        loading={loading}
                        hasMore={hasMore}
                        label={t('home.noMoreThread')}
                    />
                }
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
        </ScreenWapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(2)
    }
})
