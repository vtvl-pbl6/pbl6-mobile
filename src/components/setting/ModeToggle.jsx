import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { useTheme } from '../../contexts'
import { toggleDarkMode } from '../../store/slices/themeSlice'
import { wp } from '../../utils'

const CustomModeToggle = () => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)

    const handlePress = mode => {
        if (
            (mode === 'light' && isDarkMode) ||
            (mode === 'dark' && !isDarkMode)
        ) {
            dispatch(toggleDarkMode())
        }
    }

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: currentColors.extraLightGray }
            ]}
        >
            <Pressable
                style={[
                    styles.segment,
                    !isDarkMode && styles.selectedSegment,
                    { borderColor: currentColors.lightGray }
                ]}
                onPress={() => handlePress('light')}
            >
                <Ionicons
                    name={!isDarkMode ? 'sunny' : 'sunny-outline'}
                    size={wp(7)}
                    color={!isDarkMode ? 'orange' : 'gray'}
                />
            </Pressable>

            <Pressable
                style={[
                    styles.segment,
                    isDarkMode && styles.selectedSegment,
                    { borderColor: currentColors.lightGray }
                ]}
                onPress={() => handlePress('dark')}
            >
                <Ionicons
                    name={isDarkMode ? 'moon' : 'moon-outline'}
                    size={wp(7)}
                    color={isDarkMode ? 'white' : 'gray'}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.md,
        width: wp(50)
    },
    segment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp(5),
        borderRadius: theme.radius.md
    },
    selectedSegment: {
        borderWidth: 0.5
    }
})

export default CustomModeToggle
