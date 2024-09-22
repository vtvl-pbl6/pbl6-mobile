import AsyncStorage from '@react-native-async-storage/async-storage'

const saveToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.error('Error saving to storage', error)
    }
}

const removeFromStorage = async key => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.error('Error removing from storage', error)
    }
}

const getFromStorage = async (key, defaultValue) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value !== null ? value : defaultValue
    } catch (error) {
        console.error('Error getting from storage', error)
        return defaultValue
    }
}

// Using AsyncStorage for theme
export const saveThemeToStorage = theme => saveToStorage('theme', theme)
export const clearThemeFromStorage = () => removeFromStorage('theme')
export const getThemeFromStorage = () => getFromStorage('theme', 'light')

// Using AsyncStorage for language
export const saveLanguage = language => saveToStorage('lang', language)
export const clearLanguage = () => removeFromStorage('lang')
export const getLangFromStorage = () => getFromStorage('lang', 'vi')

// Using AsyncStorage for token
export const saveTokensToStorage = async ({ accessToken, refreshToken }) => {
    await saveToStorage('accessToken', accessToken)
    await saveToStorage('refreshToken', refreshToken)
}
export const clearTokensFromStorage = async () => {
    await removeFromStorage('accessToken')
    await removeFromStorage('refreshToken')
}
export const getTokensFromStorage = async () => {
    const accessToken = await getFromStorage('accessToken', null)
    const refreshToken = await getFromStorage('refreshToken', null)
    return { accessToken, refreshToken }
}
