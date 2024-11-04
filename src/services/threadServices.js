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
    getById: async id => {
        return await apiClient.get('/thread/' + id)
    },
    likeThread: async threadId => {
        return await apiClient.patch(`/thread/${threadId}/like`)
    },
    unlikeThread: async threadId => {
        return await apiClient.patch(`/thread/${threadId}/unlike`)
    },
    shareThread: async threadId => {
        return await apiClient.post(`/thread/${threadId}/share`)
    },
    unsharedThread: async threadId => {
        return await apiClient.post(`/thread/${threadId}/unshared`)
    },
    deleteThread: async threadId => {
        return await apiClient.delete(`/thread/${threadId}`)
    },
    update: async (id, data) => {
        return await apiClient.put(`/thread/${id}`, data)
    }
}

export default threadService
