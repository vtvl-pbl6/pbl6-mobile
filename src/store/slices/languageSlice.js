import { createSlice } from '@reduxjs/toolkit'
import { getLangFromStorage, saveLanguage } from '../../utils/storageUtils'

const initialState = {
    language: 'vi'
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
            saveLanguage(action.payload)
        }
    }
})

export const initializeLanguage = () => async dispatch => {
    const language = await getLangFromStorage()
    const finalLanguage = language || 'vi'
    dispatch(languageSlice.actions.setLanguage(finalLanguage))
}
export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
