import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { wp } from '../../utils/dimensionUtils'

const Toast = ({ message, type }) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const getIcon = toastType => {
        switch (toastType) {
            case 'success':
                return (
                    <Ionicons
                        name="checkmark-circle"
                        size={wp(6)}
                        color="green"
                    />
                )
            case 'error':
                return <Ionicons name="close-circle" size={wp(6)} color="red" />
            case 'info':
                return (
                    <Ionicons
                        name="information-circle"
                        size={wp(6)}
                        color="gray"
                    />
                )
            case 'warning':
                return <Ionicons name="warning" size={wp(6)} color="orange" />
            default:
                return null
        }
    }

    return (
        <View
            style={[
                styles.toastContainer,
                { backgroundColor: currentColors.text }
            ]}
        >
            {getIcon(type)}
            <Text
                style={{
                    fontSize: wp(3.5),
                    color: currentColors.background,
                    marginLeft: 10
                }}
            >
                {message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: theme.radius.xxl,
        margin: 10
    }
})

export default Toast
