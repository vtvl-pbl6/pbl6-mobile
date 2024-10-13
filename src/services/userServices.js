import apiClient from './apiClient'

const userService = {
    getUserInfo: async () => {
        return await apiClient.get('/user')
    },
    getUserById: async id => {
        return await apiClient.get(`/user?id=${id}`)
    }
}

export default userService
