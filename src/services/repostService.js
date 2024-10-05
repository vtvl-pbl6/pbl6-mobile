import apiClient from './apiClient'

const repostService = {
    getRepostByCurrentUser: async page => {
        return await apiClient.get(`/repost?page=${page}&limit=10`)
    }
}

export default repostService
