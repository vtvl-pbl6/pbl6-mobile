import { configureStore } from '@reduxjs/toolkit'
import activitiesReducer from './slices/activitiesSlice'
import authReducer from './slices/authSlice'
import languageReducer from './slices/languageSlice'
import loadingReducer from './slices/loadingSlice'
import notificationReducer from './slices/notificationSlice'
import searchReducer from './slices/searchSlice'
import themeReducer from './slices/themeSlice'
import threadReducer from './slices/threadSlice'
import toastReducer from './slices/toastSlice'
import updateReducer from './slices/updateSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        theme: themeReducer,
        language: languageReducer,
        toast: toastReducer,
        loading: loadingReducer,
        update: updateReducer,
        notification: notificationReducer,
        threads: threadReducer,
        activities: activitiesReducer,
        search: searchReducer
    }
})

export default store
