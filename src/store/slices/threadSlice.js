import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    threads: [],
    myThreads: [],
    reposts: [],
    comments: [],
    userThreads: [],
    userReposts: [],
    threadDetail: null,
    hasMore: true,
    hasMoreMyThread: true,
    hasMoreRepost: true,
    hasMoreUserThread: true,
    hasMoreUserRepost: true
}

const updateProperty = (item, type, userId) => {
    switch (type) {
        case 'SHARE':
            item.shared_num = (item.shared_num ?? 0) + 1
            item.sharers = [...(item.sharers ?? []), { id: userId }]
            break
        case 'UNSHARED':
            item.shared_num -= 1
            item.sharers = item.sharers.filter(user => user.id !== userId)
            break
        case 'LIKE':
            item.reaction_num = (item.reaction_num ?? 0) + 1
            item.react_users = [...(item.react_users ?? []), { id: userId }]
            break
        case 'UNLIKE':
            item.reaction_num -= 1
            item.react_users = item.react_users.filter(
                user => user.id !== userId
            )
            break
        case 'COMMENT':
            item.comment_num += 1
            break
        case 'DELETE_COMMENT':
            item.comment_num -= 1
            break
        case 'EDIT_THREAD':
            return true
        default:
            break
    }
    return false
}

const updateItem = (items, id, type, userId) => {
    const index = items.findIndex(item => item.id === id)

    if (index !== -1) {
        const shouldDelete = updateProperty(items[index], type, userId)
        if (shouldDelete) {
            items.splice(index, 1)
        }
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
        setUserThreads(state, action) {
            state.userThreads = [
                ...state.userThreads,
                ...action.payload.userThreads
            ]
            state.hasMoreUserThread = action.payload.hasMoreUserThread
        },
        clearUserThreads(state) {
            state.userThreads = []
            state.hasMoreUserThread = true
        },
        setUserReposts(state, action) {
            state.userReposts = [
                ...state.userReposts,
                ...action.payload.userReposts
            ]
            state.hasMoreUserRepost = action.payload.hasMoreUserRepost
        },
        clearUserReposts(state) {
            state.userReposts = []
            state.hasMoreUserRepost = true
        },
        setThreadDetail(state, action) {
            state.threadDetail = action.payload
        },
        clearThreadDetail(state) {
            state.threadDetail = null
        },
        setComments(state, action) {
            state.comments = action.payload
        },
        clearComments(state) {
            state.comments = []
        },
        updateInteraction(state, action) {
            const { id, type, userId } = action.payload

            updateItem(state.threads, id, type, userId)
            updateItem(state.myThreads, id, type, userId)
            updateItem(state.reposts, id, type, userId)
            updateItem(state.userThreads, id, type, userId)
            updateItem(state.userReposts, id, type, userId)

            if (state.threadDetail && state.threadDetail.id === id) {
                updateProperty(state.threadDetail, type, userId)
            }
        },
        updateInteractionAndListComment(state, action) {
            const { id, type, comment } = action.payload

            updateItem(state.threads, id, type)
            updateItem(state.myThreads, id, type)
            updateItem(state.reposts, id, type)

            if (state.threadDetail && state.threadDetail.id === id) {
                updateProperty(state.threadDetail, type)
            }

            if (comment) {
                if (!Array.isArray(state.comments)) {
                    state.comments = []
                }
                state.comments = [comment, ...state.comments]
            }
        },
        clearAllThreads(state) {
            state.threads = []
            state.myThreads = []
            state.reposts = []
            state.comments = []
            state.hasMore = true
            state.hasMoreMyThread = true
            state.hasMoreRepost = true
        },
        deleteThreadById(state, action) {
            const { id } = action.payload
            state.threads = state.threads.filter(thread => thread.id !== id)
        },
        deleteMyThreadById(state, action) {
            const { id } = action.payload
            state.myThreads = state.myThreads.filter(
                myThread => myThread.id !== id
            )
        },
        deleteRepostById(state, action) {
            const { id } = action.payload
            state.reposts = state.reposts.filter(repost => repost.id !== id)
        },
        deleteCommentById(state, action) {
            const { id, comment, type, parent_id } = action.payload
            state.comments = state.comments.filter(comment => comment.id !== id)

            updateItem(state.threads, parent_id, type)
            updateItem(state.myThreads, parent_id, type)
            updateItem(state.reposts, parent_id, type)

            if (state.threadDetail && state.threadDetail.id === parent_id) {
                updateProperty(state.threadDetail, type)
            }
        },
        updateThreadById(state, action) {
            const { id, newData } = action.payload
            const index = state.threads.findIndex(thread => thread.id === id)
            if (index !== -1) {
                state.threads[index] = {
                    ...state.threads[index],
                    ...newData
                }
            }
        },
        updateMyThreadById(state, action) {
            const { id, newData } = action.payload
            const index = state.myThreads.findIndex(
                myThread => myThread.id === id
            )
            if (index !== -1) {
                state.myThreads[index] = {
                    ...state.myThreads[index],
                    ...newData
                }
            }
        },
        updateRepostById(state, action) {
            const { id, newData } = action.payload
            const index = state.reposts.findIndex(repost => repost.id === id)
            if (index !== -1) {
                state.reposts[index] = {
                    ...state.reposts[index],
                    ...newData
                }
            }
        },
        updateCommentById(state, action) {
            const { id, newData } = action.payload
            const index = state.comments.findIndex(comment => comment.id === id)
            if (index !== -1) {
                state.comments[index] = {
                    ...state.comments[index],
                    ...newData
                }
            }
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
    clearAllThreads,
    setComments,
    clearComments,
    setThreadDetail,
    clearThreadDetail,
    updateInteractionAndListComment,
    deleteThreadById,
    deleteMyThreadById,
    deleteRepostById,
    deleteCommentById,
    updateThreadById,
    updateMyThreadById,
    updateRepostById,
    updateCommentById,
    setUserThreads,
    clearUserThreads,
    setUserReposts,
    clearUserReposts
} = threadsSlice.actions
export default threadsSlice.reducer
