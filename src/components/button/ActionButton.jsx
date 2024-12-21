import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { wp } from '../../utils'

const ActionButton = ({ iconName, label, onPress, buttonStyle, color }) => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: currentColors.background },
                buttonStyle
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.label,
                    { color: color ? color : currentColors.text }
                ]}
            >
                {label}
            </Text>
            <Ionicons
                name={iconName}
                size={wp(6)}
                color={color ? color : currentColors.text}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4),
        width: wp(90),
        justifyContent: 'space-between'
    },
    label: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    }
})

export default ActionButton
