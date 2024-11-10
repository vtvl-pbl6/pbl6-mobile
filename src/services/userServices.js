import apiClient from './apiClient'

const userService = {
    getInfo: async () => {
        return await apiClient.get('/user')
    },
    updateInfo: async data => {
        return await apiClient.patch('/user', data)
    },
    getById: async id => {
        return await apiClient.get(`/user?id=${id}`)
    },
    search: async (username, page) => {
        return await apiClient.get(
            `/user/search?limit=10&page=${page}&display_name=${username}`
        )
    },
    follow: async id => {
        return await apiClient.post(`/user/${id}/follow`)
    },
    unfollow: async id => {
        return await apiClient.post(`/user/${id}/unfollow`)
    }
}

export default userService
