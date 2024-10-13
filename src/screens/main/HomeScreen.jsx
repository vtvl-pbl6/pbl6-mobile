import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Facebook } from 'react-content-loader/native'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { ScreenWapper, Thread } from '../../components'
import { useLanguage, useTheme } from '../../contexts'
import threadService from '../../services/threadServices'
import userService from '../../services/userServices'
import { setUser, showToast } from '../../store/slices'
import { hp, wp } from '../../utils'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
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

    const getCurrentUser = async () => {
        const userResponse = await userService.getUserInfo()
        dispatch(setUser(userResponse.data))
    }

    useEffect(() => {
        getCurrentUser()
    }, [refreshing])

    useEffect(() => {
        fetchThreads()
    }, [page, refreshing])

    const loadMoreThreads = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const handleThreadPress = thread => {
        navigation.navigate('ThreadDetail', { thread: thread })
    }

    const handleProfileNavigation = userId => {
        navigation.navigate('UserProfile', { userId: userId })
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        setThreads([])
        setPage(1)
        setHasMore(true)
        await fetchThreads()
        setRefreshing(false)
    }

    const renderFooter = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    size="small"
                    color={currentColors.text}
                    style={{ paddingVertical: 30 }}
                />
            )
        }
        if (!hasMore) {
            const animationSource =
                currentColors.background === '#FFFFFF'
                    ? require('../../../assets/animations/notFoundLight.json')
                    : require('../../../assets/animations/notFoundDark.json')

            return (
                <View style={{ flex: 1 }}>
                    <LottieView
                        source={animationSource}
                        autoPlay
                        loop
                        enableMergePathsAndroidForKitKatAndAbove={true}
                        style={[styles.animation]}
                    />
                    <Text
                        style={[
                            styles.noMoreText,
                            { color: currentColors.text }
                        ]}
                    >
                        {t('home.noMoreThread')}
                    </Text>
                </View>
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
                    <Pressable onPress={() => handleThreadPress(item)}>
                        <Thread
                            thread={item}
                            loading={loading}
                            onGoToProfile={handleProfileNavigation}
                        />
                    </Pressable>
                )}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreThreads}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
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
    },
    noMoreText: {
        textAlign: 'center',
        padding: 16
    },
    animation: {
        width: wp(100),
        height: hp(20),
        alignSelf: 'center'
    }
})
