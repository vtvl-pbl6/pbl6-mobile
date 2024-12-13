import apiClient from './apiClient'

const threadService = {
    getNewFeed: async page => {
        return await apiClient.get(`/thread?page=${page}&limit=15`)
    },
    create: async data => {
        return await apiClient.post('/thread', data)
    },
    getByAuthorId: async (page, author_id) => {
        return await apiClient.get(
            `/thread?page=${page}&limit=10&author_id=${author_id}`
        )
    },
    getById: async id => {
        return await apiClient.get('/thread/' + id)
    },
    like: async id => {
        return await apiClient.patch(`/thread/${id}/like`)
    },
    unlike: async id => {
        return await apiClient.patch(`/thread/${id}/unlike`)
    },
    share: async id => {
        return await apiClient.post(`/thread/${id}/share`)
    },
    unshared: async id => {
        return await apiClient.post(`/thread/${id}/unshared`)
    },
    delete: async id => {
        return await apiClient.delete(`/thread/${id}`)
    },
    update: async (id, data) => {
        return await apiClient.put(`/thread/${id}`, data)
    },
    moderation: async (id, data) => {
        return await apiClient.post(`/thread/${id}/moderation/request`, data)
    }
}

export default threadService
