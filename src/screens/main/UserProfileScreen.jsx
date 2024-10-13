import { useFocusEffect, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    BaseHeader,
    ProfileInfo,
    ProfileInfoLoader,
    ScreenWapper,
    Thread,
    ThreadLoader
} from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import repostService from '../../services/repostService'
import threadService from '../../services/threadServices'
import userService from '../../services/userServices'
import { showToast } from '../../store/slices'
import { hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const UserProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const handleError = useHandleError(navigation)
    const loading = useSelector(state => state.loading)

    const route = useRoute()
    const { userId } = route.params

    const [selectedTab, setSelectedTab] = useState('thread')
    const [threads, setThreads] = useState([])
    const [reposts, setReposts] = useState([])
    const [user, setUser] = useState(null)
    const [threadPage, setThreadPage] = useState(1)
    const [repostPage, setRepostPage] = useState(1)
    const [hasThreadMore, setThreadHasMore] = useState(true)
    const [hasRepostMore, setRepostHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [loadUserInfo, setLoadUserInfo] = useState(false)
    const [loadThread, setLoadThread] = useState(false)
    const [loadRepost, setLoadRepost] = useState(false)
    const [isRefreshStateReset, setIsRefreshStateReset] = useState(false)
    const [isResetDone, setIsResetDone] = useState(false)

    const getUserInfo = async () => {
        if (loadUserInfo) return
        setLoadUserInfo(true)

        try {
            const response = await userService.getUserById(userId)
            const { data, is_success } = response

            if (is_success) {
                setUser(data)
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
            const response = await threadService.getThreadsByAuthor(
                threadPage,
                userId
            )

            const { data, is_success, metadata } = response

            if (is_success) {
                setThreads(prev => {
                    const newThreads = data.filter(
                        thread => !prev.some(t => t.id === thread.id)
                    )
                    return [...prev, ...newThreads]
                })
                setThreadHasMore(metadata.current_page < metadata.total_page)
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
            const response = await repostService.getRepostByUserId(
                userId,
                repostPage
            )

            const { data, is_success, metadata } = response

            if (is_success) {
                setReposts(prev => {
                    const newRepost = data.filter(
                        thread => !prev.some(t => t.id === thread.id)
                    )
                    return [...prev, ...newRepost]
                })
                setRepostHasMore(metadata.current_page < metadata.total_page)
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
            setThreads([])
            setReposts([])
            setThreadPage(1)
            setRepostPage(1)
            setThreadHasMore(true)
            setRepostHasMore(true)

            setIsResetDone(true)
        }, [])
    )

    useEffect(() => {
        if (isResetDone) {
            getUserInfo()
            fetchThread()
            fetchRepost()
        }
    }, [isResetDone])

    const handleRefresh = async () => {
        setRefreshing(true)
        if (selectedTab === 'thread') {
            setThreads([])
            setThreadPage(1)
            setThreadHasMore(true)
        } else if (selectedTab === 'reposts') {
            setReposts([])
            setRepostPage(1)
            setRepostHasMore(true)
        }

        setIsRefreshStateReset(true)
    }

    useEffect(() => {
        if (isRefreshStateReset) {
            const fetchData = async () => {
                if (selectedTab === 'thread') {
                    await fetchThread()
                } else if (selectedTab === 'reposts') {
                    await fetchRepost()
                }

                await getUserInfo()
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
    }, [userId])

    const handleChangeTab = tab => {
        if (tab !== selectedTab) {
            setSelectedTab(tab)
        }
    }

    const renderHeader = () =>
        loadUserInfo ? (
            <ProfileInfoLoader />
        ) : (
            <View style={styles.top}>
                {user ? <ProfileInfo user={user} /> : null}
                <Pressable
                    style={[
                        styles.followButton,
                        { backgroundColor: currentColors.text }
                    ]}
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
            </View>
        )

    const renderTab = () => (
        <View
            style={[
                styles.tabContainer,
                {
                    borderBottomColor: currentColors.lightGray,
                    backgroundColor: currentColors.background
                }
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.tabButton,
                    { marginLeft: wp(2) },
                    selectedTab === 'thread' && [
                        styles.activeTab,
                        { borderBottomColor: currentColors.text }
                    ]
                ]}
                onPress={() => handleChangeTab('thread')}
            >
                <Text
                    style={[
                        styles.tabText,
                        { color: currentColors.gray },
                        selectedTab === 'thread' && {
                            color: currentColors.text
                        }
                    ]}
                >
                    {t('profile.thread')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tabButton,
                    { marginRight: wp(2) },
                    selectedTab === 'reposts' && [
                        styles.activeTab,
                        { borderBottomColor: currentColors.text }
                    ]
                ]}
                onPress={() => handleChangeTab('reposts')}
            >
                <Text
                    style={[
                        styles.tabText,
                        { color: currentColors.gray },
                        selectedTab === 'reposts' && {
                            color: currentColors.text
                        }
                    ]}
                >
                    {t('profile.reposts')}
                </Text>
            </TouchableOpacity>
        </View>
    )

    const loadMoreThreads = tab => {
        if (tab === 'thread' && hasThreadMore && !loadThread) {
            setThreadPage(prevPage => prevPage + 1)
            fetchThread()
        } else if (tab === 'reposts' && hasRepostMore && !loadRepost) {
            setRepostPage(prevPage => prevPage + 1)
            fetchRepost()
        }
    }

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
                // keyExtractor={item => `${tab}-${item.id.toString()}`}
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
                onBackPress={() => navigation.goBack()}
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
                            return renderTab()
                        case 'content':
                            return renderContent()
                        default:
                            return null
                    }
                }}
                onRefresh={handleRefresh}
                refreshing={refreshing}
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
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5
    },
    tabButton: {
        paddingVertical: hp(1),
        width: wp(48),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        fontSize: wp(4),
        fontWeight: 'bold'
    },
    activeTab: {
        borderBottomWidth: 1
    },
    noMoreText: {
        textAlign: 'center',
        padding: 16
    }
})
