import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLanguage } from '../contexts'
import ThreadDetailScreen from '../screens/main/ThreadDetailScreen'
import UserProfileScreen from '../screens/main/UserProfileScreen'
import EditThreadScreen from '../screens/profile/EditThreadScreen'
import {
    connectSocket,
    disconnectSocket,
    subscribeThreadChannel,
    subscribeThreadPrivateChannel,
    subscribeToNotifications
} from '../services/socketService'
import threadService from '../services/threadServices'
import {
    addNotification,
    setNotificationStatus,
    setUnreadNotification,
    showToast
} from '../store/slices'
import {
    updateCommentById,
    updateInteraction,
    updateInteractionAndListComment,
    updateMyThreadById
} from '../store/slices/threadSlice'
import useHandleError from '../utils/handlers/errorHandler'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

const RootStack = createNativeStackNavigator()

const AppNavigator = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useLanguage()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.user.user)
    const handleError = useHandleError(navigation)

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
                    subscribeThreadPrivateChannel(
                        user.email,
                        async notification => {
                            console.log('Notification received:', notification)
                            const { object_id, type, sender, content } =
                                notification
                            if (type == 'CREATE_THREAD_DONE') {
                                const response =
                                    await threadService.getById(object_id)
                                const { data } = response
                                console.log('DATA: ', data)
                                dispatch(
                                    updateMyThreadById({
                                        id: object_id,
                                        newData: data
                                    })
                                ),
                                    dispatch(
                                        updateCommentById({
                                            id: object_id,
                                            newData: data
                                        })
                                    )
                            }
                            if (
                                type == 'REQUEST_THREAD_MODERATION_FAILED' ||
                                type == 'REQUEST_THREAD_MODERATION_SUCCESS'
                            ) {
                                dispatch(
                                    setNotificationStatus({
                                        type: type,
                                        status: true
                                    })
                                )
                                dispatch(setUnreadNotification(true))
                                const response =
                                    await threadService.getById(object_id)
                                const { data } = response

                                dispatch(
                                    updateMyThreadById({
                                        id: object_id,
                                        newData: data
                                    })
                                )
                                dispatch(
                                    showToast({
                                        message: content,
                                        type: 'info'
                                    })
                                )
                                dispatch(addNotification(notification))
                            }
                        }
                    )
                    subscribeThreadChannel(user.email, async thread => {
                        console.log('Thread received:', thread)
                        const { read, object_id, type, content, sender } =
                            thread

                        dispatch(
                            setNotificationStatus({ type: type, status: true })
                        )

                        if (
                            type == 'UNSHARED' ||
                            type == 'SHARE' ||
                            type == 'LIKE' ||
                            type == 'UNLIKE' ||
                            type == 'EDIT_THREAD'
                        ) {
                            dispatch(
                                updateInteraction({
                                    id: object_id,
                                    type: type,
                                    userId: sender.id
                                })
                            )
                        }

                        if (type == 'COMMENT') {
                            try {
                                const response =
                                    await threadService.getById(object_id)
                                const { data } = response
                                dispatch(
                                    updateInteractionAndListComment({
                                        id: data.parent_thread.id,
                                        type: type,
                                        comment: data
                                    })
                                )

                                dispatch(setUnreadNotification(true))
                                dispatch(addNotification(thread))
                            } catch (error) {
                                dispatch(handleError(error))
                            }
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
                    <RootStack.Screen
                        name="EditThread"
                        component={EditThreadScreen}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="ThreadDetail"
                        component={ThreadDetailScreen}
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
