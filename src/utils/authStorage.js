import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveTokensToStorage = ({ accessToken, refreshToken }) => {
    AsyncStorage.setItem('accessToken', accessToken)
    AsyncStorage.setItem('refreshToken', refreshToken)
}

export const clearTokensFromStorage = () => {
    AsyncStorage.removeItem('accessToken')
    AsyncStorage.removeItem('refreshToken')
}

export const getTokensFromStorage = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.error('Failed to get tokens:', error)
        return {
            accessToken: null,
            refreshToken: null
        }
    }
}
