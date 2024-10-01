import apiClient from './apiClient'

const threadService = {
    getFollowingUserThreads: async page => {
        return await apiClient.get(`/thread?page=${page}&limit=6`)
    }
}

export default threadService
