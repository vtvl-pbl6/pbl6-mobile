import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import theme from '../constants/theme'
import { useLanguage, useTheme } from '../contexts'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import PrivacyScreen from '../screens/profile/PrivacyScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import SettingScreen from '../screens/profile/SettingScreen'
import { wp } from '../utils'

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                contentStyle: { backgroundColor: currentColors.background },
                headerTitleStyle: {
                    fontWeight: theme.fonts.bold,
                    fontSize: wp(4),
                    color: currentColors.text
                },
                headerStyle: {
                    backgroundColor: currentColors.background
                },
                headerTintColor: currentColors.text,
                headerBackTitle: t('headerShown.back'),
                headerBackTitleStyle: {
                    fontWeight: theme.fonts.medium,
                    fontSize: wp(3.6)
                }
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Privacy"
                component={PrivacyScreen}
                options={{
                    title: t('headerShown.privacy')
                }}
            />
            <Stack.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{
                    title: t('headerShown.setting')
                }}
            />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator
