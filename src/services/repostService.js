import apiClient from './apiClient'

const repostService = {
    getByCurrentUser: async page => {
        return await apiClient.get(`/repost?page=${page}&limit=10`)
    },
    getByUserId: async (userId, page) => {
        return await apiClient.get(
            `/repost/user/${userId}?page=${page}&limit=10`
        )
    }
}

export default repostService
