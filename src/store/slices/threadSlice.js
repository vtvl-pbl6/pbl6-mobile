import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    threads: [],
    myThreads: [],
    reposts: [],
    hasMore: true,
    hasMoreMyThread: true,
    hasMoreRepost: true
}

const updateProperty = (item, type) => {
    switch (type) {
        case 'SHARE':
            item.shared_num += 1
            break
        case 'UNSHARED':
            item.shared_num -= 1
            break
        case 'LIKE':
            item.reaction_num += 1
            break
        case 'UNLIKE':
            item.reaction_num -= 1
        default:
            break
    }
}

const updateItem = (items, id, type) => {
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
        updateProperty(items[index], type)
    }
}

const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        setThreads(state, action) {
            state.threads = [...state.threads, ...action.payload.threads]
            state.hasMore = action.payload.hasMore
        },
        clearThreads(state) {
            state.threads = []
            state.hasMore = true
        },
        setMyThreads(state, action) {
            state.myThreads = [...state.myThreads, ...action.payload.myThreads]
            state.hasMoreMyThread = action.payload.hasMoreMyThread
        },
        clearMyThreads(state) {
            state.myThreads = []
            state.hasMoreMyThread = true
        },
        setReposts(state, action) {
            state.reposts = [...state.reposts, ...action.payload.reposts]
            state.hasMoreRepost = action.payload.hasMoreRepost
        },
        clearReposts(state) {
            state.reposts = []
            state.hasMoreRepost = true
        },
        updateInteraction(state, action) {
            const { id, type } = action.payload
            updateItem(state.threads, id, type)
            updateItem(state.myThreads, id, type)
            updateItem(state.reposts, id, type)
        },
        clearAllThreads(state) {
            state.threads = []
            state.myThreads = []
            state.reposts = []
            state.hasMore = true
            state.hasMoreMyThread = true
            state.hasMoreRepost = true
        }
    }
})

export const {
    setThreads,
    clearThreads,
    setMyThreads,
    clearMyThreads,
    setReposts,
    clearReposts,
    updateInteraction,
    clearAllThreads
} = threadsSlice.actions
export default threadsSlice.reducer
