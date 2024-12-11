import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: []
    },
    reducers: {
        setSearchResults(state, action) {
            state.results = action.payload
        },
        updateSearchResult(state, action) {
            const { id, follower_num, is_followed_by_current_user } =
                action.payload
            state.results = state.results
                .map(item =>
                    item.id === id
                        ? { ...item, follower_num, is_followed_by_current_user }
                        : item
                )
                .slice()
        },
        resetSearchResults(state) {
            state.results = []
        }
    }
})

export const { setSearchResults, updateSearchResult, resetSearchResults } =
    searchSlice.actions
export default searchSlice.reducer
