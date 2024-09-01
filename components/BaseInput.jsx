import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const BaseInput = (props) => {
    return (
        <View style={[styles.container, props.containerStyles && props.containerStyles]}>
            {
                props.icon && props.icon
            }
            <TextInput 
                style={{flex: 1}}
                placeholderTextColor={theme.colors.textLight}
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
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        paddingHorizontal: 18,
        gap: 12
    }
})