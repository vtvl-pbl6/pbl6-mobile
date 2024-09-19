import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer
} from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './src/i18n'
import AppNavigator from './src/navigation/AppNavigator'
import { initializeLanguage } from './src/store/slices/languageSlice'
import { initializeTheme } from './src/store/slices/themeSlice'
import store from './src/store/store'

const App = () => {
    const dispatch = useDispatch()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const language = useSelector(state => state.language.language)

    const theme = isDarkMode ? DarkTheme : DefaultTheme

    useEffect(() => {
        dispatch(initializeTheme())
        dispatch(initializeLanguage())
    }, [dispatch])

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
            <App />
        </Provider>
    )
}

export default RootApp
