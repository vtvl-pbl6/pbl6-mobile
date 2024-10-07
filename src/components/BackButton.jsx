import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../constants/theme'

const BackButton = ({ size = 26 }) => {
    const navigation = useNavigation()
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: currentColors.extraLightGray }
            ]}
            onPress={() => navigation.goBack()}
        >
            <View>
                <Ionicons
                    name="chevron-back-outline"
                    size={size}
                    color={currentColors.gray}
                />
            </View>
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm
    }
})
