import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer
} from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Provider, useSelector } from 'react-redux'
import colors from './src/constants/color'
import AppNavigator from './src/navigation/AppNavigator'
import store from './src/store/store'

const App = () => {
    const darkMode = useSelector(state => state.theme.darkMode)
    const theme = darkMode ? DarkTheme : DefaultTheme
    const statusBarStyle = darkMode ? 'light-content' : 'dark-content'
    const backgroundColor = darkMode
        ? colors.darkMode.background
        : colors.lightMode.background

    return (
        <>
            <StatusBar
                barStyle={statusBarStyle}
                backgroundColor={backgroundColor}
            />
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
