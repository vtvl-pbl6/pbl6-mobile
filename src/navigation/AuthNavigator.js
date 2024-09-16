import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
        />
        <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <AuthStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
        />
        <AuthStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
        />
        <AuthStack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
        />
    </AuthStack.Navigator>
)

export default AuthNavigator
