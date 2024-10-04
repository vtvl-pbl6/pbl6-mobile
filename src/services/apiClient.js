import { API_HEADER_NAME, API_HEADER_VALUE, API_URL } from '@env'
import axios from 'axios'
import {
    getTokensFromStorage,
    saveTokensToStorage
} from '../utils/storageUtils'

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        [API_HEADER_NAME]: API_HEADER_VALUE
    }
})

// Attach token to each request
apiClient.interceptors.request.use(
    async config => {
        if (config.url !== '/auth/login' && config.url !== '/auth/register') {
            const { accessToken } = await getTokensFromStorage()
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        }

        // Adjust headers if data is FormData
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data'
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// Get new access token
const refreshToken = async () => {
    try {
        const { refreshToken } = await getTokensFromStorage()
        if (!refreshToken) {
            throw new Error('No refresh token found')
        }

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken
        })
        const { accessToken, newRefreshToken } = response.data

        saveTokensToStorage({
            accessToken,
            refreshToken: newRefreshToken || refreshToken
        })

        return accessToken
    } catch (error) {
        throw error
    }
}

// Handling responses
apiClient.interceptors.response.use(
    response => response.data,
    async error => {
        const { config, response: errorResponse } = error

        if (!errorResponse) {
            return Promise.reject('Unknown error occurred.')
        }

        const { errors } = errorResponse.data

        // ERR_TOK0102: Expired token!
        const tokenError = errors.find(err => err.code === 'ERR_TOK0102')
        if (tokenError) {
            if (!config.__isRetryRequest) {
                config.__isRetryRequest = true

                try {
                    const newAccessToken = await refreshToken()
                    config.headers.Authorization = `Bearer ${newAccessToken}`
                    return apiClient(config) // Re-make request with new token
                } catch (refreshError) {
                    return Promise.reject(refreshError)
                }
            }
        }
        return Promise.reject(errorResponse.data)
    }
)

export default apiClient
