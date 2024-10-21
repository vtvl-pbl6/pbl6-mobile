import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLanguage } from '../contexts'
import UserProfileScreen from '../screens/main/UserProfileScreen'
import {
    connectSocket,
    disconnectSocket,
    subscribeThreadChannel,
    subscribeToNotifications
} from '../services/socketService'
import {
    addNotification,
    setNotificationStatus,
    setUnreadNotification,
    showToast
} from '../store/slices'
import { updateInteraction } from '../store/slices/threadSlice'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

const RootStack = createNativeStackNavigator()

const AppNavigator = () => {
    const dispatch = useDispatch()
    const { t } = useLanguage()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        if (isAuthenticated && user?.email) {
            connectSocket(
                () => {
                    subscribeToNotifications(user.email, notification => {
                        console.log('Notification received:', notification)
                        const { read, type, sender } = notification
                        dispatch(
                            setNotificationStatus({ type: type, status: true })
                        )
                        if (type == 'FOLLOW') {
                            dispatch(setUnreadNotification(true))
                            const message = `${sender.display_name} ${t('activity.followed')}`
                            dispatch(
                                showToast({ message: message, type: 'info' })
                            )
                            dispatch(addNotification(notification))
                        }
                    })
                    subscribeThreadChannel(user.email, thread => {
                        console.log('Thread received:', thread)
                        const { read, object_id, type } = thread

                        dispatch(
                            setNotificationStatus({ type: type, status: true })
                        )

                        if (type == 'UNSHARED' || type == 'SHARE') {
                            dispatch(
                                updateInteraction({ id: object_id, type: type })
                            )
                        }
                    })
                },
                error => console.error('WebSocket error:', error)
            )

            return () => {
                disconnectSocket()
                console.log('WebSocket disconnected.')
            }
        }
    }, [isAuthenticated, user?.email, dispatch])

    return (
        <RootStack.Navigator>
            {isAuthenticated ? (
                <>
                    <RootStack.Screen
                        name="MainTabs"
                        component={TabNavigator}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="UserProfile"
                        component={UserProfileScreen}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <RootStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                />
            )}
        </RootStack.Navigator>
    )
}

export default AppNavigator
