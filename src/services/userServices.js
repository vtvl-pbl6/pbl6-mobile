import apiClient from './apiClient'

const userService = {
    getUserInfo: async () => {
        return await apiClient.get('/user')
    }
}

export default userService
