import { createSlice } from '@reduxjs/toolkit'

const updateSlice = createSlice({
    name: 'update',
    initialState: false,
    reducers: {
        setUpdate: (state, action) => action.payload
    }
})

export const { setUpdate } = updateSlice.actions
export default updateSlice.reducer
