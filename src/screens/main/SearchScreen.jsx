import { Ionicons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import ScreenWapper from '../../components/ScreenWapper'
import BaseButton from '../../components/base/BaseButton'
import BaseInput from '../../components/base/BaseInput'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'

const SearchScreen = () => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

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
