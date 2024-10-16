// [ TEST CODE ]

import { API_WS_URL } from '@env'
import { Client } from '@stomp/stompjs'
import { Alert } from 'react-native'
import SockJS from 'sockjs-client'
import { getTokensFromStorage } from '../utils/storageUtils'

let stompClient = null

const connectSocket = async (onConnected, onError) => {
    const socket = new SockJS(API_WS_URL)

    const { accessToken } = await getTokensFromStorage()

    if (!accessToken) {
        console.error('No access token found!')
        return
    }

    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
            Authorization: `Bearer ${accessToken}`
        },
        onConnect: onConnected,
        onStompError: error => {
            console.error('STOMP error:', error)
            if (onError) onError(error)
            Alert.alert(
                'Connection Error',
                'An error occurred while connecting to the WebSocket.'
            )
        }
    })

    stompClient.activate() // Kích hoạt WebSocket
}

const subscribeToChat = onMessageReceived => {
    if (stompClient) {
        stompClient.subscribe('/public', onMessageReceived) // Đăng ký nhận tin nhắn chat
    }
}

// const subscribeToNotifications = (email, onNotificationReceived) => {
//     if (stompClient) {
//         console.log("EMAIL: ", email)
//         const notificationPath = `/private/${email}/user/notification`
//         console.log('Subscribing to:', notificationPath)
//         stompClient.subscribe(notificationPath, onNotificationReceived) // Đăng ký nhận thông báo
//     }
// }

const subscribeToNotifications = (email, onNotificationReceived) => {
    if (stompClient) {
        const notificationPath = `/private/${email}/user/notification`
        console.log('Subscribing to notifications:', notificationPath)
        stompClient.subscribe(notificationPath, message => {
            const notification = JSON.parse(message.body)
            console.log('Notification data:', notification)
            onNotificationReceived(notification)
        })
    }
}

const sendMessage = messageData => {
    if (stompClient && messageData) {
        stompClient.publish({
            destination: '/app/message',
            body: JSON.stringify(messageData) // Gửi tin nhắn tới server
        })
    }
}

const disconnectSocket = () => {
    if (stompClient) {
        stompClient.deactivate()
    }
}

export {
    connectSocket,
    disconnectSocket,
    sendMessage,
    subscribeToChat,
    subscribeToNotifications
}
