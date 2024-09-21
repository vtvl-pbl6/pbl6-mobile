import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import 'intl-pluralrules'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import vi from './locales/vi.json'

i18n.use(initReactI18next).init({
    fallbackLng: 'vi',
    lng: 'vi',
    resources: {
        en: { translation: en },
        vi: { translation: vi }
    },
    interpolation: {
        escapeValue: false
    }
})

const loadLanguageFromStorage = async () => {
    try {
        const lang = await AsyncStorage.getItem('lang')
        if (lang) {
            i18n.changeLanguage(lang)
        }
    } catch (error) {
        console.error('Error loading language from storage', error)
    }
}
loadLanguageFromStorage()

export default i18n
