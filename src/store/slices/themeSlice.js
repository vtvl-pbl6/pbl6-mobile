import { createSlice } from '@reduxjs/toolkit'
import {
    getThemeFromStorage,
    saveThemeToStorage
} from '../../utils/storageUtils'

const initialState = {
    isDarkMode: false
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: state => {
            state.isDarkMode = !state.isDarkMode
            saveThemeToStorage(state.isDarkMode ? 'dark' : 'light')
        },
        setDarkModeFromStorage: (state, action) => {
            state.isDarkMode = action.payload === 'dark'
        }
    }
})

export const initializeTheme = () => async dispatch => {
    const t = await getThemeFromStorage()
    const theme = t === 'dark' ? 'dark' : 'light'
    dispatch(themeSlice.actions.setDarkModeFromStorage(theme))
}
export const { toggleDarkMode } = themeSlice.actions
export default themeSlice.reducer
