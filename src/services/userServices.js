import apiClient from './apiClient'

const userService = {
    getUserInfo: async () => {
        return await apiClient.get('/user')
    },
    getUserById: async id => {
        return await apiClient.get(`/user?id=${id}`)
    },
    searchUser: async (username, page) => {
        return await apiClient.get(
            `/user/search?limit=10&page=${page}&display_name=${username}`
        )
    },
    followUser: async id => {
        return await apiClient.post(`/user/${id}/follow`)
    },
    unfollowUser: async id => {
        return await apiClient.post(`/user/${id}/unfollow`)
    }
}

export default userService
