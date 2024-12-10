import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../contexts'

const ScreenWrapper = ({ children, styles }) => {
    const insets = useSafeAreaInsets()
    const { currentColors } = useTheme()

    return (
        <View
            style={[
                {
                    flex: 1,
                    paddingTop: insets.top,
                    backgroundColor: currentColors.background
                },
                styles
            ]}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})

export default ScreenWrapper
