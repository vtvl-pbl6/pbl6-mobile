import React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import TabBarButton from './TabBarButton'

const TabBar = ({ state, descriptors, navigation }) => {

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

                return (
                    <TabBarButton
                        key={route.name}
                        style={styles.tabbarItem}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? theme.colors.primaryDark : theme.colors.grayDark}
                        label={label}
                    />
                )

                // return (
                //     <TouchableOpacity
                //         key={route.name}
                //         style={styles.tabbarItem}
                //         accessibilityRole="button"
                //         accessibilityState={isFocused ? { selected: true } : {}}
                //         accessibilityLabel={options.tabBarAccessibilityLabel}
                //         testID={options.tabBarTestID}
                //         onPress={onPress}
                //         onLongPress={onLongPress}
                //     >
                //         {
                //             icons[route.name]({
                //                 color: isFocused ? theme.colors.primaryDark : theme.colors.grayDark
                //             })
                //         }
                //         <Text style={{ color: isFocused ? theme.colors.primaryDark : theme.colors.grayDark }}>
                //             {label}
                //         </Text>
                //     </TouchableOpacity>
                // )
            })}
        </View>
    )
}

export default TabBar

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: hp(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: wp(5),
        paddingVertical: hp(2),
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        shadow: theme.colors.dark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
    }
})