import apiClient from './apiClient'

const authService = {
    login: async credentials => {
        return await apiClient.post('/auth/login', credentials)
    }
}

export default authService
