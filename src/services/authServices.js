import apiClient from './apiClient'

const authService = {
    login: async credentials => {
        return await apiClient.post('/auth/login', credentials)
    },
    register: async user => {
        console.log('USER: ', user)
        return await apiClient.post('/auth/register', user)
    }
}

export default authService
