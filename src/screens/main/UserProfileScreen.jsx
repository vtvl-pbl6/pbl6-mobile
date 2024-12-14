import { useFocusEffect, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    BaseHeader,
    BaseModal,
    Loading,
    ProfileInfo,
    ProfileInfoLoader,
    ScreenWapper,
    Thread,
    ThreadLoader
} from '../../components'
import ProfileTabs from '../../components/profile/ProfileTabs'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import repostService from '../../services/repostService'
import threadService from '../../services/threadServices'
import userService from '../../services/userServices'
import { setUpdate, showToast } from '../../store/slices'
import { updateSearchResult } from '../../store/slices/searchSlice'
import {
    clearUserReposts,
    clearUserThreads,
    setUserReposts,
    setUserThreads
} from '../../store/slices/threadSlice'
import { hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const UserProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const handleError = useHandleError(navigation)
    const update = useSelector(state => state.update)

    const route = useRoute()
    const { userId } = route?.params

    const [selectedTab, setSelectedTab] = useState('thread')
    const threads = useSelector(state => state.threads.userThreads)
    const hasThreadMore = useSelector(state => state.threads.hasMoreUserThread)
    const reposts = useSelector(state => state.threads.userReposts)
    const hasRepostMore = useSelector(state => state.threads.hasMoreUserRepost)
    const [user, setUser] = useState(null)
    const [threadPage, setThreadPage] = useState(1)
    const [repostPage, setRepostPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [loadUserInfo, setLoadUserInfo] = useState(false)
    const [loadThread, setLoadThread] = useState(false)
    const [loadRepost, setLoadRepost] = useState(false)
    const [isRefreshStateReset, setIsRefreshStateReset] = useState(false)
    const [isResetDone, setIsResetDone] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)
    const [isStateReset, setIsStateReset] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleConfirm = () => {
        setIsModalVisible(false)
        handleUnFollow()
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const getUserInfo = async () => {
        if (loadUserInfo) return
        setLoadUserInfo(true)

        try {
            const response = await userService.getById(userId)
            const { data, is_success } = response

            if (is_success) {
                setUser(data)
                setIsFollowed(data.is_followed_by_current_user ?? false)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoadUserInfo(false)
        }
    }

    const fetchThread = async () => {
        if (!userId || loadThread) return
        setLoadThread(true)

        try {
            const response = await threadService.getByAuthorId(
                threadPage,
                userId
            )

            const { data, is_success, metadata } = response

            if (is_success) {
                const uniqueThreads = data.filter(
                    thread => !threads.some(t => t.id === thread.id)
                )

                if (threadPage === 1) {
                    dispatch(clearUserThreads())
                }

                dispatch(
                    setUserThreads({
                        userThreads: uniqueThreads,
                        hasMoreUserThread:
                            metadata.current_page < metadata.total_page
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
            handleError(error)
        } finally {
            setLoadThread(false)
        }
    }

    const fetchRepost = async () => {
        if (!userId || loadRepost) return
        setLoadRepost(true)

        try {
            const response = await repostService.getByUserId(userId, repostPage)

            const { data, is_success, metadata } = response

            if (is_success) {
                const uniqueReposts = data.filter(
                    thread => !reposts.some(t => t.id === thread.id)
                )

                if (repostPage === 1) {
                    dispatch(clearUserReposts())
                }
                dispatch(
                    setUserReposts({
                        userReposts: uniqueReposts,
                        hasMoreUserRepost:
                            metadata.current_page < metadata.total_page
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
            handleError(error)
        } finally {
            setLoadRepost(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setIsResetDone(false)

            setSelectedTab('thread')
            dispatch(clearUserThreads())
            dispatch(clearUserReposts())
            setThreadPage(1)
            setRepostPage(1)

            setIsResetDone(true)
        }, [userId])
    )

    useFocusEffect(
        React.useCallback(() => {
            if (isResetDone) {
                getUserInfo()
                fetchThread()
                fetchRepost()
            }
        }, [isResetDone])
    )

    const handleRefresh = async () => {
        setRefreshing(true)
        if (selectedTab === 'thread') {
            dispatch(clearUserThreads())
            setThreadPage(1)
        } else if (selectedTab === 'reposts') {
            dispatch(clearUserReposts())
            setRepostPage(1)
        }

        setIsRefreshStateReset(true)
    }

    useEffect(() => {
        if (isRefreshStateReset) {
            const fetchData = async () => {
                if (selectedTab === 'thread') {
                    await Promise.all([getUserInfo(), fetchThread()])
                } else if (selectedTab === 'reposts') {
                    await Promise.all([getUserInfo(), fetchRepost()])
                }
                setRefreshing(false)
                setIsRefreshStateReset(false)
            }

            fetchData()
        }
    }, [isRefreshStateReset])

    // useEffect(() => {
    //     getUserInfo()
    //     fetchThread()
    //     fetchRepost()
    // }, [userId])

    const reloadAPIs = async () => {
        setRefreshing(true)
        setIsStateReset(true)
    }

    useEffect(() => {
        if (isStateReset) {
            const fetchData = async () => {
                await getUserInfo()
                setRefreshing(false)
                setIsStateReset(false)
            }

            fetchData()
        }
    }, [isStateReset])

    useEffect(() => {
        if (update) {
            reloadAPIs()
        }
    }, [update])

    const handleFollow = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.follow(userId)

            if (response.is_success) {
                setIsFollowed(response.is_success)

                const updatedFollowerNum = (user.follower_num ?? 0) + 1
                user.follower_num = updatedFollowerNum

                dispatch(
                    updateSearchResult({
                        id: userId,
                        follower_num: user.follower_num,
                        is_followed_by_current_user: true
                    })
                )
            }

            dispatch(setUpdate(true))
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
            dispatch(setUpdate(false))
        }
    }

    const handleUnFollow = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.unfollow(userId)

            if (response.is_success) {
                setIsFollowed(!response.is_success)
                const updatedFollowerNum = (user.follower_num ?? 0) - 1
                user.follower_num = updatedFollowerNum

                dispatch(
                    updateSearchResult({
                        id: userId,
                        follower_num: updatedFollowerNum,
                        is_followed_by_current_user: false
                    })
                )
            }

            dispatch(setUpdate(true))
        } catch (error) {
            console.error(error)
            handleError(error)
        } finally {
            setLoading(false)
            dispatch(setUpdate(false))
        }
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const renderHeader = () =>
        loadUserInfo ? (
            <ProfileInfoLoader />
        ) : (
            <View style={styles.top}>
                {user ? <ProfileInfo user={user} /> : null}
                {loading ? (
                    <Loading size="small" />
                ) : isFollowed ? (
                    <Pressable
                        style={[
                            styles.followButton,
                            {
                                backgroundColor: currentColors.background,
                                borderColor: currentColors.lightGray,
                                borderWidth: 0.5
                            }
                        ]}
                        onPress={showModal}
                    >
                        <Text
                            style={[
                                styles.followButtonText,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('profile.followed')}
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={[
                            styles.followButton,
                            { backgroundColor: currentColors.text }
                        ]}
                        onPress={handleFollow}
                    >
                        <Text
                            style={[
                                styles.followButtonText,
                                { color: currentColors.background }
                            ]}
                        >
                            {t('profile.follow')}
                        </Text>
                    </Pressable>
                )}
            </View>
        )

    const loadMoreThreads = tab => {
        if (tab === 'thread' && hasThreadMore && !loadThread) {
            setThreadPage(prevPage => prevPage + 1)
        } else if (tab === 'reposts' && hasRepostMore && !loadRepost) {
            setRepostPage(prevPage => prevPage + 1)
        }
    }

    useEffect(() => {
        if (threadPage > 1) {
            fetchThread()
        }
    }, [threadPage])

    useEffect(() => {
        if (repostPage > 1) {
            fetchRepost()
        }
    }, [repostPage])

    const renderList = (data, tab) => {
        if (tab === 'thread' && !data.length && loadThread == false) {
            return (
                <Text
                    style={{
                        textAlign: 'center',
                        color: currentColors.text,
                        padding: wp(4)
                    }}
                >
                    {t('profile.noData')}
                </Text>
            )
        }

        if (tab === 'reposts' && !data.length && loadRepost == false) {
            return (
                <Text
                    style={{
                        textAlign: 'center',
                        color: currentColors.text,
                        padding: wp(4)
                    }}
                >
                    {t('profile.noData')}
                </Text>
            )
        }

        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => `${tab}-${item.id}-${index}`}
                renderItem={({ item }) => <Thread thread={item} />}
                showsVerticalScrollIndicator={false}
                onEndReached={() => loadMoreThreads(selectedTab)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        )
    }

    const renderContent = () => {
        return selectedTab === 'thread'
            ? renderList(threads, 'threads')
            : renderList(reposts, 'reposts')
    }

    const renderFooter = () => {
        if (
            (selectedTab === 'thread' && loadThread) ||
            (selectedTab === 'reposts' && loadRepost)
        ) {
            return <ThreadLoader />
        }
        if (!hasThreadMore && selectedTab == 'thread') {
            return (
                <Text
                    style={[styles.noMoreText, { color: currentColors.text }]}
                >
                    {t('profile.noMoreThread')}
                </Text>
            )
        }
        if (!hasRepostMore && selectedTab == 'reposts') {
            return (
                <Text
                    style={[styles.noMoreText, { color: currentColors.text }]}
                >
                    {t('profile.noMoreReposts')}
                </Text>
            )
        }
        return null
    }

    return (
        <ScreenWapper>
            <BaseHeader
                title={t('profile.title')}
                border={false}
                onBackPress={() => {
                    navigation.navigate('Search', { user: user })
                }}
            />
            <FlatList
                style={{
                    backgroundColor: currentColors.background
                }}
                data={[{ key: 'header' }, { key: 'tabs' }, { key: 'content' }]}
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    switch (item.key) {
                        case 'header':
                            return renderHeader()
                        case 'tabs':
                            return (
                                <ProfileTabs
                                    selectedTab={selectedTab}
                                    handleChangeTab={setSelectedTab}
                                />
                            )
                        case 'content':
                            return renderContent()
                        default:
                            return null
                    }
                }}
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
            <BaseModal
                visible={isModalVisible}
                title={
                    user ? `${t('search.unfollow')} ${user.display_name}` : ''
                }
                message={t('search.confirmUnfollow')}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ScreenWapper>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    navigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },
    top: {
        paddingVertical: wp(2)
    },
    followButton: {
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius.sm,
        paddingVertical: hp(1.2),
        marginTop: hp(1)
    },
    followButtonText: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    },
    noMoreText: {
        textAlign: 'center',
        padding: 16
    }
})
