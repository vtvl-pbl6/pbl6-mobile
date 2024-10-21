import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    FollowNotification,
    NotificationLoader,
    ScreenWapper
} from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import notificationService from '../../services/notificationService'
import { hp, wp } from '../../utils'

const ActivityScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const notificationsQuick = useSelector(
        state => state.notification.notifications
    )

    const animationSource =
        currentColors.background === '#FFFFFF'
            ? require('../../../assets/animations/notFoundLight.json')
            : require('../../../assets/animations/notFoundDark.json')

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [notifications, setNotifications] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const fetchNotification = async () => {
        if (loading || !hasMore) return
        setLoading(true)

        try {
            const response = await notificationService.getNotifications(page)
            const { data, is_success, metadata } = response

            if (is_success) {
                setNotifications(prev => {
                    const newNotifications = data.filter(
                        notification =>
                            !prev.some(t => t.id === notification.id)
                    )
                    return [...prev, ...newNotifications]
                })

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

    useEffect(() => {
        fetchNotification()
    })

    useEffect(() => {
        setNotifications(prev => {
            const newNotifications = notificationsQuick.filter(
                notification => !prev.some(t => t.id === notification.id)
            )
            return [...newNotifications, ...prev]
        })
    }, [notificationsQuick])

    const loadMoreNotification = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const handleRefresh = async () => {
        if (refreshing) return
        setRefreshing(true)
        setNotifications([])
        setPage(1)
        setHasMore(true)
        await fetchNotification()
        setRefreshing(false)
    }

    const renderNotification = ({ item }) => {
        switch (item.type) {
            case 'FOLLOW':
                return <FollowNotification notification={item} />
            case 'COMMENT':
                return <Text>{t('Comment')}</Text>
            default:
                return null
        }
    }

    useEffect(() => {
        fetchNotification()
    }, [page, refreshing])

    const renderFooter = () => {
        {
            loading && (
                <FlatList
                    data={[...Array(6)]}
                    renderItem={({ index }) => (
                        <NotificationLoader key={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            )
        }
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
                    style={[styles.noMoreText, { color: currentColors.text }]}
                >
                    {t('activity.empty')}
                </Text>
            </View>
        )
    }

    return (
        <ScreenWapper
            styles={[
                styles.container,
                { backgroundColor: currentColors.background }
            ]}
        >
            <Text style={[styles.title, { color: currentColors.text }]}>
                {t('activity.title')}
            </Text>

            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.5}
                style={styles.notification}
                onEndReached={loadMoreNotification}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
            />
        </ScreenWapper>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    title: {
        fontSize: wp(6),
        fontWeight: theme.fonts.bold,
        marginBottom: wp(2),
        marginHorizontal: wp(2)
    },
    notification: {
        marginHorizontal: wp(2)
    },
    animation: {
        width: wp(100),
        height: hp(20),
        alignSelf: 'center'
    },
    noMoreText: {
        textAlign: 'center',
        padding: 16
    }
})
