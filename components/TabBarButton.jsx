import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { icons } from '../constants/icons'
import { wp } from '../helpers/common'

const TabBarButton = (props) => {
    const { isFocused, label, routeName, color } = props
    const scale = useSharedValue(0)

    useEffect(() => {
        scale.value = withSpring(
            isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        )
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(()=>{

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.5]
        )

        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8]
        )

        return {
            // styles
            transform: [{scale: scaleValue}],
            top
        }
    })

    const animatedTextStyle = useAnimatedStyle(()=>{

        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0]
        )

        return {
            // styles
            opacity
        }
    })

    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={[animatedIconStyle]}>
                {
                    icons[routeName]({
                        color
                    })
                }
            </Animated.View>
            <Animated.Text style={[{ color, fontSize: wp(3.2) }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}

export default TabBarButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    }
})