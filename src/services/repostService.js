import apiClient from './apiClient'

const repostService = {
    getRepostByCurrentUser: async page => {
        return await apiClient.get(`/repost?page=${page}&limit=6`)
    }
}

export default repostService
