import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    theme: themeReducer
})

export default rootReducer
