import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useLanguage, useTheme } from '../contexts'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import PrivacyScreen from '../screens/profile/PrivacyScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import SettingScreen from '../screens/profile/SettingScreen'

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: currentColors.background }
            }}
        >
            <Stack.Screen name="ProfileMain" component={ProfileScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator
