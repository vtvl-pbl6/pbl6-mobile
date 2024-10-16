import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    unreadNotifications: false,
    notifications: [],
    notificationStatus: {
        FOLLOW: false,
        UNFOLLOW: false,
        CREATE_THREAD_DONE: false,
        COMMENT: false,
        LIKE: false,
        UNLIKE: false,
        SHARE: false,
        UNSHARED: false,
        REQUEST_THREAD_MODERATION: false,
        REQUEST_THREAD_MODERATION_FAILED: false,
        REQUEST_THREAD_MODERATION_SUCCESS: false
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        // Set the read or unread status for all notifications
        setUnreadNotification: (state, action) => {
            state.unreadNotifications = action.payload
        },

        // Update notification status
        setNotificationStatus: (state, action) => {
            const { type, status } = action.payload
            if (state.notificationStatus[type] !== undefined) {
                state.notificationStatus[type] = status
            }
        },

        // Add notification to array
        addNotification: (state, action) => {
            const notification = action.payload
            state.notifications.push(notification)
            state.unreadNotifications = true
        },

        // Delete notification by id
        removeNotification: (state, action) => {
            const notificationId = action.payload
            state.notifications = state.notifications.filter(
                notification => notification.id !== notificationId
            )
        },

        // Mark all notifications as read
        markAllAsRead: state => {
            state.unreadNotifications = false
            state.notifications = state.notifications.map(notification => ({
                ...notification,
                read: true
            }))
        },

        // Delete all notification statuses
        clearAllNotifications: state => {
            state.notifications = []
            state.unreadNotifications = false
            for (let type in state.notificationStatus) {
                state.notificationStatus[type] = false
            }
        }
    }
})

export const {
    setUnreadNotification,
    setNotificationStatus,
    addNotification,
    removeNotification,
    markAllAsRead,
    clearAllNotifications
} = notificationSlice.actions

export default notificationSlice.reducer
