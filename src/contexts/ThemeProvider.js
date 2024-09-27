import React, { createContext, useContext } from 'react'
import { useSelector } from 'react-redux'
import theme from '../constants/theme'

const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext)
}

const ThemeProvider = ({ children }) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <ThemeContext.Provider value={{ currentColors }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
