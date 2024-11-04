import apiClient from './apiClient'

const threadService = {
    getNewFeed: async page => {
        return await apiClient.get(`/thread?page=${page}&limit=10`)
    },
    create: async threadData => {
        return await apiClient.post('/thread', threadData)
    },
    getByAuthorId: async (page, author_id) => {
        return await apiClient.get(
            `/thread?page=${page}&limit=10&author_id=${author_id}`
        )
    },
    getById: async id => {
        return await apiClient.get('/thread/' + id)
    },
    like: async threadId => {
        return await apiClient.patch(`/thread/${threadId}/like`)
    },
    unlike: async threadId => {
        return await apiClient.patch(`/thread/${threadId}/unlike`)
    },
    share: async threadId => {
        return await apiClient.post(`/thread/${threadId}/share`)
    },
    unshared: async threadId => {
        return await apiClient.post(`/thread/${threadId}/unshared`)
    },
    delete: async threadId => {
        return await apiClient.delete(`/thread/${threadId}`)
    },
    update: async (id, data) => {
        return await apiClient.put(`/thread/${id}`, data)
    }
}

export default threadService
