import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import PrivacyScreen from '../screens/profile/PrivacyScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="ProfileMain" component={ProfileScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ presentation: 'modal' }}
        />
    </Stack.Navigator>
)

export default ProfileNavigator
