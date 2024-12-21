import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useLanguage, useTheme } from '../contexts'
import ChangePassword from '../screens/profile/ChangePassword'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import EditThreadScreen from '../screens/profile/EditThreadScreen'
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
            <Stack.Screen name="EditThread" component={EditThreadScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator
