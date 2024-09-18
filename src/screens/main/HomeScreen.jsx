import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/color'
import { setLanguage } from '../../store/slices/languageSlice'
import { toggleDarkMode } from '../../store/slices/themeSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const language = useSelector(state => state.language.language)
    const currentColors = isDarkMode ? colors.darkMode : colors.lightMode

    const handleLanguageChange = lng => {
        dispatch(setLanguage(lng))
        i18n.changeLanguage(lng)
    }

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode())
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: currentColors.background
            }}
        >
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
        </View>
    )
}

export default HomeScreen
