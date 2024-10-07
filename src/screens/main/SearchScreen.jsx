import { Ionicons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import { BaseButton, BaseInput, ScreenWapper } from '../../components'
import { useLanguage, useTheme } from '../../contexts'
import { hp, wp } from '../../utils'

const SearchScreen = () => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const usernameRef = useRef('')

    const onSubmit = async () => {
        alert('SUBMIT')
    }

    return (
        <ScreenWapper
            styles={{
                backgroundColor: currentColors.background,
                alignItems: 'center'
            }}
        >
            <Text>SearchScreen</Text>
            <BaseInput
                icon={
                    <Ionicons
                        name="person-outline"
                        size={hp(2)}
                        color={currentColors.gray}
                    ></Ionicons>
                }
                placeholder="Enter your username"
                onChangeText={value => (usernameRef.current = value)}
                containerStyles={{ width: wp(80) }}
            />
            <BaseButton
                title="Login"
                onPress={onSubmit}
                buttonStyle={{ width: wp(80), marginTop: 10 }}
            />
        </ScreenWapper>
    )
}

const styles = StyleSheet.create({})

export default SearchScreen
