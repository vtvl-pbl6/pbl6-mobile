import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import TabBar from '../components/TabBar'
import ActivityScreen from '../screens/main/ActivityScreen'
import HomeScreen from '../screens/main/HomeScreen'
import SearchScreen from '../screens/main/SearchScreen'
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
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator
