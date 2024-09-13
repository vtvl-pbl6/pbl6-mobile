import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import colors from '../constants/color'

const useThemeColors = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode)

    return useMemo(
        () => (isDarkMode ? colors.darkMode : colors.lightMode),
        [isDarkMode]
    )
}

export default useThemeColors
