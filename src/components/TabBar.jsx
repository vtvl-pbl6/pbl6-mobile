import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../constants/theme'
import { setUnreadNotification } from '../store/slices'
import { hp, wp } from '../utils/dimensionUtils'

const TabBar = ({ state, navigation }) => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const insets = useSafeAreaInsets()
    const unreadNotifications = useSelector(
        state => state.notification.unreadNotifications
    )
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const [selectedIndex, setSelectedIndex] = useState(state.index)

    const tabs = [
        { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
        { name: 'Search', icon: 'search-outline', activeIcon: 'search' },
        { name: 'Compose', icon: 'add-outline', isCompose: true },
        { name: 'Activity', icon: 'heart-outline', activeIcon: 'heart' },
        { name: 'Profile', icon: 'person-outline', activeIcon: 'person' }
    ]

    const handlePress = (index, route) => {
        setSelectedIndex(index)

        if (route === 'Activity') {
            dispatch(setUnreadNotification(false))
        }

        navigation.navigate(route)
    }

    return (
        <View
            style={[
                styles.tabBar,
                {
                    backgroundColor: currentColors.background,
                    paddingBottom: insets.bottom / 2
                }
            ]}
        >
            {tabs.map((tab, index) =>
                tab.isCompose ? (
                    <Pressable
                        key={index}
                        style={[
                            styles.composeButton,
                            { backgroundColor: currentColors.extraLightGray }
                        ]}
                        onPress={() => handlePress(index, tab.name)}
                    >
                        <Ionicons
                            name={tab.icon}
                            size={wp(8)}
                            style={{
                                color:
                                    selectedIndex === index
                                        ? currentColors.text
                                        : currentColors.gray
                            }}
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        key={index}
                        style={styles.tabButton}
                        onPress={() => handlePress(index, tab.name)}
                    >
                        <Ionicons
                            name={
                                selectedIndex === index
                                    ? tab.activeIcon
                                    : tab.icon
                            }
                            size={wp(6)}
                            color={
                                selectedIndex === index
                                    ? currentColors.text
                                    : currentColors.gray
                            }
                        />
                        {tab.name === 'Activity' && unreadNotifications && (
                            <View style={styles.notificationBadge} />
                        )}
                    </Pressable>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: hp(1)
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: wp(10),
        marginBottom: hp(1)
    },
    composeButton: {
        marginBottom: hp(1),
        width: wp(18),
        padding: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.sm
    },
    notificationBadge: {
        backgroundColor: theme.colors.rose,
        borderRadius: 50,
        width: wp(1.2),
        height: wp(1.2),
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TabBar
