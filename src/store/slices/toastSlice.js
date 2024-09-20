import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toasts: []
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action) => {
            if (state.toasts.length > 0) {
                state.toasts.shift()
            }
            state.toasts.push(action.payload)
        },
        hideToast: state => {
            state.toasts.shift()
        }
    }
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
