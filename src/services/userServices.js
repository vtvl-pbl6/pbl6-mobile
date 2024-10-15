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
    }
}

export default userService
