import React, { useEffect, useState } from 'react'
import { Facebook } from 'react-content-loader/native'
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { ScreenWapper, Thread } from '../../components'
import { useLanguage, useTheme } from '../../contexts'
import threadService from '../../services/threadServices'
import { showToast } from '../../store/slices/toastSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchThreads = async () => {
        if (loading || !hasMore) return
        setLoading(true)

        try {
            const response = await threadService.getFollowingUserThreads(page)
            const { data, is_success, metadata } = response

            if (is_success) {
                setThreads(prevThreads => [...prevThreads, ...data])

                if (metadata.current_page >= metadata.total_page) {
                    setHasMore(false)
                }
            } else {
                setHasMore(false)
                dispatch(
                    showToast({
                        message: t('home.fetchFailed'),
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

    useEffect(() => {
        fetchThreads()
    }, [page])

    const loadMoreThreads = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const renderFooter = () => {
        if (loading) {
            return <ActivityIndicator size="small" color={currentColors.text} />
        }
        if (!hasMore) {
            return (
                <Text
                    style={[styles.noMoreText, { color: currentColors.text }]}
                >
                    {t('home.noMoreThread')}
                </Text>
            )
        }
        return null
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
                    <Thread thread={item} loading={loading} />
                )}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreThreads}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </ScreenWapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noMoreText: {
        textAlign: 'center',
        padding: 16
    }
})
