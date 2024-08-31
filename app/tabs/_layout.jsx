import { Tabs } from 'expo-router'
import React from 'react'
import TabBar from '../../components/TabBar'

const TabsLayout = () => {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{headerShown: false}}
        >
            <Tabs.Screen name="home" options={{title: 'Home'}}/>
            <Tabs.Screen name="search" options={{title: 'Search'}}/>
            <Tabs.Screen name="notification" options={{title: 'Notification'}}/>
            <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
        </Tabs>
    )
}

export default TabsLayout
