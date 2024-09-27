import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'
import theme from '../constants/theme'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import PrivacyScreen from '../screens/profile/PrivacyScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: currentColors.background }
            }}
        >
            <Stack.Screen name="ProfileMain" component={ProfileScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigator
