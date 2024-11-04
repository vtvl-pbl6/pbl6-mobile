import apiClient from './apiClient'

const notificationService = {
    getAll: async page => {
        return await apiClient.get(`/notification?page=${page}&limit=10`)
    }
}

export default notificationService
