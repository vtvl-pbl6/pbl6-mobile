import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import colors from '../../constants/color'
import useThemeColors from '../../hooks/useThemeColors'
import { toggleDarkMode } from '../../store/slices/themeSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const currentColors = useThemeColors()

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: currentColors.background }
            ]}
        >
            <Text style={[styles.text, { color: currentColors.text }]}>
                Welcome to Home Screen!
            </Text>
            <Button
                title={
                    currentColors === colors.darkMode
                        ? 'Switch to Light Mode'
                        : 'Switch to Dark Mode'
                }
                onPress={() => dispatch(toggleDarkMode())}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        fontSize: 24,
        marginBottom: 20
    }
})

export default HomeScreen
