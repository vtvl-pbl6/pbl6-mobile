import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWapper = ({ children, styles }) => {
    const insets = useSafeAreaInsets()

    return (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom
                },
                styles
            ]}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})

export default ScreenWapper
