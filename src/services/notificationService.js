import apiClient from './apiClient'

const notificationService = {
    getNotifications: async page => {
        return await apiClient.get(`/notification?page=${page}&limit=10`)
    }
}

export default notificationService
