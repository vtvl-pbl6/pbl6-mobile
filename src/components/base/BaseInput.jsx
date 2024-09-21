import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { hp } from '../../utils/dimensionUtils'

const BaseInput = props => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: currentColors.gray,
                    backgroundColor: currentColors.background
                },
                props.containerStyles && props.containerStyles
            ]}
        >
            {props.icon && props.icon}
            <TextInput
                style={{
                    flex: 1,
                    color: currentColors.text
                }}
                placeholderTextColor={currentColors.gray}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
        </View>
    )
}

export default BaseInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.sm,
        paddingHorizontal: 18,
        gap: 12,
        borderWidth: 0.5
    }
})
