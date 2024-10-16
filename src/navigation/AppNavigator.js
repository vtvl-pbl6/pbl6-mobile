import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import UserProfileScreen from '../screens/main/UserProfileScreen'
import {
    connectSocket,
    disconnectSocket,
    subscribeToNotifications
} from '../services/socketService'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

const RootStack = createNativeStackNavigator()

const AppNavigator = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        if (isAuthenticated && user?.email) {
            connectSocket(
                () => {
                    console.log('WebSocket connected.')
                    subscribeToNotifications(user.email, notification => {
                        console.log('Notification received:', notification)
                    })
                },
                error => console.error('WebSocket error:', error)
            )

            return () => {
                disconnectSocket()
                console.log('WebSocket disconnected.')
            }
        }
    }, [isAuthenticated, user?.email])

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
