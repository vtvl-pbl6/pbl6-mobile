import { createSlice } from '@reduxjs/toolkit'
import {
    clearTokensFromStorage,
    getTokensFromStorage
} from '../../utils/storageUtils'

const initialState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
            clearTokensFromStorage()
        },
        setAuthentication(state, action) {
            state.isAuthenticated = action.payload
        }
    }
})

export const checkAuthentication = () => async dispatch => {
    const { accessToken } = await getTokensFromStorage()
    const isAuthenticated = accessToken !== null
    dispatch(setAuthentication(isAuthenticated))
}

export const { login, logout, setAuthentication } = authSlice.actions
export default authSlice.reducer
