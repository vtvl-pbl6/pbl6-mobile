import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import { setLanguage } from '../../store/slices/languageSlice'
import { toggleDarkMode } from '../../store/slices/themeSlice'

const EditProfileScreen = () => {
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

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
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
        </ScreenWapper>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})
