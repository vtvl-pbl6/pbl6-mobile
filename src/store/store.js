import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import languageReducer from './slices/languageSlice'
import loadingReducer from './slices/loadingSlice'
import themeReducer from './slices/themeSlice'
import toastReducer from './slices/toastSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        theme: themeReducer,
        language: languageReducer,
        toast: toastReducer,
        loading: loadingReducer
    }
})

export default store
