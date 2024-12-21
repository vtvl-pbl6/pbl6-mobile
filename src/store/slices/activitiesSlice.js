import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activities: [],
    hasMore: true
}

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setActivities(state, action) {
            state.activities = [
                ...state.activities,
                ...action.payload.activities
            ]
            state.hasMore = action.payload.hasMore
        },
        clearActivities(state) {
            state.activities = []
            state.hasMore = true
        },
        addActivityToFront(state, action) {
            state.activities = [action.payload, ...state.activities]
        }
    }
})

export const { setActivities, clearActivities, addActivityToFront } =
    activitiesSlice.actions
export default activitiesSlice.reducer
