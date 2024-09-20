import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../constants/theme'

const Loading = ({ size = 'large', containerStyle }) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: currentColors.background },
                containerStyle
            ]}
        >
            <ActivityIndicator size={size} color={currentColors.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading
