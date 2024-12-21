import React from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../contexts'

const KeyboardWrapper = ({ children, styles }) => {
    const insets = useSafeAreaInsets()
    const { currentColors } = useTheme()

    return (
        <KeyboardAvoidingView
            style={[
                {
                    flex: 1,
                    paddingTop: insets.top,
                    backgroundColor: currentColors.background
                },
                styles
            ]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>{children}</View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})

export default KeyboardWrapper
