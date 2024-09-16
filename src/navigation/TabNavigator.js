import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ActivityScreen from '../screens/main/ActivityScreen'
import HomeScreen from '../screens/main/HomeScreen'
import SearchScreen from '../screens/main/SearchScreen'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    const navigation = useNavigation()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline'
                    } else if (route.name === 'Activity') {
                        iconName = focused ? 'heart' : 'heart-outline'
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    )
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarLabel: () => null,
                headerShown: false,
                tabBarStyle: {
                    height: 90,
                    paddingTop: 10
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen
                name="Compose"
                options={{
                    tabBarButton: () => (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#F1F1F1',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.navigate('ComposeModal')}
                        >
                            <Ionicons
                                name="add-outline"
                                size={32}
                                color="gray"
                            />
                        </TouchableOpacity>
                    ),
                    headerShown: false
                }}
            >
                {() => null}
            </Tab.Screen>
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator
