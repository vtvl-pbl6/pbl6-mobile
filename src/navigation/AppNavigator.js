import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'
import ComposeScreen from '../screens/main/ComposeScreen'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

const RootStack = createNativeStackNavigator()

const AppNavigator = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    return (
        <RootStack.Navigator>
            {isAuthenticated ? (
                <RootStack.Screen
                    name="MainTabs"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <RootStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                />
            )}
            <RootStack.Screen
                name="ComposeModal"
                component={ComposeScreen}
                options={{ presentation: 'modal', headerShown: false }}
            />
        </RootStack.Navigator>
    )
}

export default AppNavigator
