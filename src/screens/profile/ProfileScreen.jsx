import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import ThreadLoader from '../../components/load/ThreadLoader'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileTabs from '../../components/profile/ProfileTabs'
import Thread from '../../components/thread/Thread'
import { useLanguage, useTheme } from '../../contexts'
import repostService from '../../services/repostService'
import threadService from '../../services/threadServices'
import userService from '../../services/userServices'
import { setNotificationStatus, setUpdate, showToast } from '../../store/slices'
import {
    clearMyThreads,
    clearReposts,
    setMyThreads,
    setReposts
} from '../../store/slices/threadSlice'
import { wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const handleError = useHandleError(navigation)
    const insets = useSafeAreaInsets()

    const loading = useSelector(state => state.loading)
    const update = useSelector(state => state.update)
    const currentUser = useSelector(state => state.user.user)
    const threads = useSelector(state => state.threads.myThreads)
    const hasThreadMore = useSelector(state => state.threads.hasMoreMyThread)
    const reposts = useSelector(state => state.threads.reposts)
    const hasRepostMore = useSelector(state => state.threads.hasMoreRepost)
    const notificationFollow = useSelector(
        state => state.notification.notificationStatus.FOLLOW
    )
    const notificationUnfollow = useSelector(
        state => state.notification.notificationStatus.UNFOLLOW
    )

    const [selectedTab, setSelectedTab] = useState('thread')
    const [user, setUser] = useState(null)
    const [threadPage, setThreadPage] = useState(1)
    const [repostPage, setRepostPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [loadUserInfo, setLoadUserInfo] = useState(false)
    const [loadThread, setLoadThread] = useState(false)
    const [loadRepost, setLoadRepost] = useState(false)
    const [isStateReset, setIsStateReset] = useState(false)
    const [isRefreshStateReset, setIsRefreshStateReset] = useState(false)

    const getUserInfo = async () => {
        if (loadUserInfo) return
        setLoadUserInfo(true)

        try {
            const response = await userService.getInfo()
            const { data, is_success } = response

            if (is_success) {
                setUser(data)
                dispatch(
                    setNotificationStatus({ type: 'FOLLOW', status: false })
                )
                dispatch(
                    setNotificationStatus({ type: 'UNFOLLOW', status: false })
                )
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoadUserInfo(false)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [notificationFollow, notificationUnfollow])

    const fetchThread = async () => {
        if (!currentUser || loadThread) return
        setLoadThread(true)

        try {
            const response = await threadService.getByAuthorId(
                threadPage,
                currentUser.id
            )

            const { data, is_success, metadata } = response

            if (is_success) {
                const uniqueThreads = data.filter(
                    thread => !threads.some(t => t.id === thread.id)
                )

                if (threadPage === 1) {
                    dispatch(clearMyThreads())
                }

                dispatch(
                    setMyThreads({
                        myThreads: uniqueThreads,
                        hasMoreMyThread:
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
        if (loadRepost) return
        setLoadRepost(true)

        try {
            const response = await repostService.getByCurrentUser(repostPage)

            const { data, is_success, metadata } = response

            if (is_success) {
                const uniqueReposts = data.filter(
                    thread => !reposts.some(t => t.id === thread.id)
                )

                if (repostPage === 1) {
                    dispatch(clearReposts())
                }

                dispatch(
                    setReposts({
                        repost: uniqueReposts,
                        hasMoreRepost:
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

    const reloadAPIs = async () => {
        setRefreshing(true)

        await Promise.all([
            dispatch(clearMyThreads()),
            dispatch(clearReposts())
        ])

        setThreadPage(1)
        setRepostPage(1)
        setIsStateReset(true)
        dispatch(setUpdate(false))
    }

    useEffect(() => {
        if (isStateReset) {
            const fetchData = async () => {
                await getUserInfo()
                await Promise.all([fetchThread(), fetchRepost()])
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

    const handleRefresh = async () => {
        setRefreshing(true)
        if (selectedTab === 'thread') {
            dispatch(clearMyThreads())
            setThreadPage(1)
        } else if (selectedTab === 'reposts') {
            dispatch(clearReposts())
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

    useEffect(() => {
        getUserInfo()
        fetchThread()
        fetchRepost()
    }, [])

    const handleEditThread = thread => {
        navigation.navigate('EditThread', { thread: thread })
    }

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
                renderItem={({ item }) => (
                    <Thread thread={item} onEdit={handleEditThread} />
                )}
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
        <FlatList
            style={{
                backgroundColor: currentColors.background,
                marginTop: insets.top
            }}
            data={[{ key: 'header' }, { key: 'tabs' }, { key: 'content' }]}
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                switch (item.key) {
                    case 'header':
                        return (
                            <ProfileHeader
                                user={user}
                                loadUserInfo={loadUserInfo}
                            />
                        )
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
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    noMoreText: {
        textAlign: 'center',
        padding: 16
    }
})
