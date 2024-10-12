import apiClient from './apiClient'

const threadService = {
    getFollowingUserThreads: async page => {
        return await apiClient.get(`/thread?page=${page}&limit=10`)
    },
    createThread: async threadData => {
        return await apiClient.post('/thread', threadData)
    },
    getThreadsByAuthor: async (page, author_id) => {
        return await apiClient.get(
            `/thread?page=${page}&limit=10&author_id=${author_id}`
        )
    },
    getThreadById: async threadId => {
        return await apiClient.get('/thread/' + threadId)
    }
}

export default threadService
