import apiClient from './apiClient'

const authService = {
    login: async credentials => {
        return await apiClient.post('/auth/login', credentials)
    },
    register: async user => {
        return await apiClient.post('/auth/register', user)
    },
    logout: async () => {
        return await apiClient.post('/auth/revoke-token')
    },
    changePassword: async data => {
        return await apiClient.post('/auth/password/change', data)
    }
}

export default authService
