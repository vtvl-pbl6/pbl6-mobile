import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BaseHeader, ScreenWapper } from '../../components'
import theme from '../../constants/theme'
import { logout, setLanguage, toggleDarkMode } from '../../store/slices'

const EditProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const language = useSelector(state => state.language.language)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const handleLanguageChange = lng => {
        dispatch(setLanguage(lng))
        i18n.changeLanguage(lng)
    }

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode())
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <BaseHeader
                title={t('setting.header')}
                onBackPress={() => navigation.goBack()}
            />
            <Text style={{ color: currentColors.text }}>{t('welcome')}</Text>
            <Button
                title={t('changeLanguage')}
                onPress={() =>
                    handleLanguageChange(language === 'vi' ? 'en' : 'vi')
                }
            />
            <Button
                title={
                    isDarkMode ? t('switchToLightMode') : t('switchToDarkMode')
                }
                onPress={handleToggleDarkMode}
            />

            <Button title="Logout" onPress={handleLogout} />
        </ScreenWapper>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})
