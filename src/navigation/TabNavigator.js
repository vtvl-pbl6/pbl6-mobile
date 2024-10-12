import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import TabBar from '../components/TabBar'
import ActivityScreen from '../screens/main/ActivityScreen'
import ComposeScreen from '../screens/main/ComposeScreen'
import HomeScreen from '../screens/main/HomeScreen'
import SearchScreen from '../screens/main/SearchScreen'
import ThreadDetail from '../screens/main/ThreadDetail'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Compose" component={ComposeScreen} />
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            <Tab.Screen name="ThreadDetail" component={ThreadDetail} />
        </Tab.Navigator>
    )
}

export default TabNavigator
