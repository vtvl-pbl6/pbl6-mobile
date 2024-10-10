import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer
} from '@react-navigation/native'
import 'fast-text-encoding'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider, useDispatch } from 'react-redux'
import Toast from './src/components/toast/Toast'
import ToastManager from './src/components/toast/ToastManager'
import LanguageProvider from './src/contexts/LanguageProvider'
import ThemeProvider, { useTheme } from './src/contexts/ThemeProvider'
import './src/i18n'
import AppNavigator from './src/navigation/AppNavigator'
import { checkAuthentication } from './src/store/slices/authSlice'
import { initializeLanguage } from './src/store/slices/languageSlice'
import { initializeTheme } from './src/store/slices/themeSlice'

import store from './src/store/store'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeTheme())
        dispatch(initializeLanguage())
        dispatch(checkAuthentication())
    }, [dispatch])

    return (
        <ThemeProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </ThemeProvider>
    )
}

const AppContent = () => {
    const { isDarkMode } = useTheme()

    const theme = isDarkMode ? DarkTheme : DefaultTheme

    return (
        <>
            <StatusBar />
            <NavigationContainer theme={theme}>
                <AppNavigator />
            </NavigationContainer>
        </>
    )
}

const RootApp = () => {
    return (
        <Provider store={store}>
            <ToastProvider renderToast={toast => <Toast {...toast} />}>
                <App />
                <ToastManager />
            </ToastProvider>
        </Provider>
    )
}

export default RootApp
