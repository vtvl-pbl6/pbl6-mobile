import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import theme from '../constants/theme'
import { hp, wp } from '../utils/dimensionUtils'
import { getSafeAreaBottom } from '../utils/safeAreaUtils'

const TabBar = ({ state, navigation }) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
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
        navigation.navigate(route)
    }

    return (
        <View
            style={[
                styles.tabBar,
                {
                    backgroundColor: currentColors.background,
                    paddingBottom: getSafeAreaBottom() / 2
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
                            size={32}
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
                            size={24}
                            color={
                                selectedIndex === index
                                    ? currentColors.text
                                    : currentColors.gray
                            }
                        />
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
    }
})

export default TabBar
