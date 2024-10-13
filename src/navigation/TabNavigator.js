import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import TabBar from '../components/TabBar'
import { useLanguage, useTheme } from '../contexts'
import ActivityScreen from '../screens/main/ActivityScreen'
import ComposeScreen from '../screens/main/ComposeScreen'
import HomeScreen from '../screens/main/HomeScreen'
import SearchScreen from '../screens/main/SearchScreen'
import ThreadDetailScreen from '../screens/main/ThreadDetailScreen'
import UserProfileScreen from '../screens/main/UserProfileScreen'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    return (
        <Tab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: currentColors.background }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Compose" component={ComposeScreen} />
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            <Tab.Screen name="ThreadDetail" component={ThreadDetailScreen} />
            <Tab.Screen name="UserProfile" component={UserProfileScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator
