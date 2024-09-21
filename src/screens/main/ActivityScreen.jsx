import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from '../../components/base/BaseModal'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import { showToast } from '../../store/slices/toastSlice'

const ActivityScreen = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const [isConfirmVisible, setConfirmVisible] = useState(false)

    const handleShowToast = () => {
        const message = 'Cảnh báo!'
        dispatch(showToast({ message, type: 'info' }))
    }

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const language = useSelector(state => state.language.language)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button title="Hiện thông báo" onPress={handleShowToast} />
                <Button
                    title="Show Confirm"
                    onPress={() => setConfirmVisible(true)}
                />
            </View>
            <BaseModal
                visible={isConfirmVisible}
                type="warning"
                title="Delete article"
                message="Are you sure want to delete this article? This action cannot be undone."
                onConfirm={() => {
                    setConfirmVisible(false)
                    // handle confirm action
                }}
                onCancel={() => setConfirmVisible(false)}
            />
        </ScreenWapper>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({})
