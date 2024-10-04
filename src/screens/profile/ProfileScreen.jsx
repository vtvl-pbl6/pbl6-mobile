import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { ProfileInfo, Thread } from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import repostService from '../../services/repostService'
import threadService from '../../services/threadServices'
import userService from '../../services/userServices'
import { showToast } from '../../store/slices'
import { getSafeAreaTop, hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const handleError = useHandleError(navigation)

    const [selectedTab, setSelectedTab] = useState('thread')
    const [threads, setThreads] = useState([])
    const [reposts, setReposts] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [threadPage, setThreadPage] = useState(1)
    const [repostPage, setRepostPage] = useState(1)
    const [hasThreadMore, setThreadHasMore] = useState(true)
    const [hasRepostMore, setRepostHasMore] = useState(true)

    const getUserInfo = async () => {
        if (loading || !hasThreadMore) return
        setLoading(true)

        try {
            const response = await userService.getUserInfo()
            const { data, is_success } = response

            if (is_success) {
                setUser(data)
                fetchData('thread')
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchData = async type => {
        if (loading || !user) return
        setLoading(true)

        try {
            let response
            if (type === 'thread') {
                response = await threadService.getThreadsByAuthor(
                    threadPage,
                    user.id
                )
            } else if (type === 'reposts') {
                response =
                    await repostService.getRepostByCurrentUser(repostPage)
            }

            const { data, is_success, metadata } = response

            if (is_success) {
                if (type === 'thread') {
                    setThreads(prev => [...prev, ...data])
                    setThreadHasMore(
                        metadata.current_page < metadata.total_page
                    )
                } else if (type === 'reposts') {
                    setReposts(prev => [...prev, ...data])
                    setRepostHasMore(
                        metadata.current_page < metadata.total_page
                    )
                }
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
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const loadMoreThreads = () => {
        if (selectedTab === 'thread' && hasThreadMore && !loading) {
            setThreadPage(prevPage => prevPage + 1)
            fetchData('thread')
        } else if (selectedTab === 'reposts' && hasRepostMore && !loading) {
            setRepostPage(prevPage => prevPage + 1)
            fetchData('reposts')
        }
    }

    const handleChangeTab = tab => {
        if (tab !== selectedTab) {
            setSelectedTab(tab)
            if (tab === 'reposts') {
                fetchData('reposts')
            } else {
                fetchData('thread')
            }
        }
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
        if (!hasThreadMore && selectedTab === 'thread') {
            return (
                <Text
                    style={[styles.noMoreText, { color: currentColors.text }]}
                >
                    {t('profile.noMoreThread')}
                </Text>
            )
        }
        if (!hasRepostMore && selectedTab === 'reposts') {
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

    const renderThreadList = data => {
        if (!data.length && !loading) {
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
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Thread thread={item} />}
                onEndReached={loadMoreThreads}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderFooter}
            />
        )
    }

    const renderContent = () => {
        return selectedTab === 'thread'
            ? renderThreadList(threads)
            : renderThreadList(reposts)
    }

    const renderHeader = () => (
        <View style={styles.top}>
            <View style={styles.navigator}>
                <Pressable style={styles.navigatorButton}>
                    <Ionicons
                        name="globe-outline"
                        size={wp(6.2)}
                        style={[styles.icon, { color: currentColors.text }]}
                    />
                </Pressable>
                <Pressable
                    style={styles.navigatorButton}
                    onPress={() =>
                        navigation.navigate('Profile', {
                            screen: 'SettingScreen'
                        })
                    }
                >
                    <Ionicons
                        name="menu-outline"
                        size={wp(8)}
                        style={[styles.icon, { color: currentColors.text }]}
                    />
                </Pressable>
            </View>
            <ProfileInfo user={user} />
            <Pressable
                style={[styles.editButton, { borderColor: currentColors.gray }]}
            >
                <Text
                    style={[
                        styles.editButtonText,
                        { color: currentColors.text }
                    ]}
                >
                    {t('profile.editProfile')}
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

    return (
        <FlatList
            style={{
                backgroundColor: currentColors.background,
                marginTop: getSafeAreaTop()
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
        />
    )
}

export default ProfileScreen

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
    editButton: {
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderRadius: theme.radius.sm,
        paddingVertical: hp(1.2),
        marginTop: hp(1)
    },
    editButtonText: {
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
