import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { hp } from '../../utils/dimensionUtils'

const BaseButton = ({
    buttonStyle,
    textStyle,
    title = '',
    onPress = () => {}
}) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const buttonColor = currentColors.text
    const textColor = currentColors.background

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                buttonStyle,
                { backgroundColor: buttonColor }
            ]}
        >
            <Text style={[styles.text, textStyle, { color: textColor }]}>
                {title}
            </Text>
        </Pressable>
    )
}

export default BaseButton

const styles = StyleSheet.create({
    button: {
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius.sm
    },
    text: {
        fontSize: hp(2.4),
        fontWeight: theme.fonts.semibold
    }
})
