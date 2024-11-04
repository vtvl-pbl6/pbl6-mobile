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

    stompClient.activate()
}

const subscribeToTopic = (topic, onMessageReceived) => {
    if (stompClient) {
        stompClient.subscribe(topic, message => {
            const data = JSON.parse(message.body)
            onMessageReceived(data)
        })
    }
}

const subscribeToNotifications = (email, onNotificationReceived) => {
    const notificationPath = `/private/${email}/user/notification`
    console.log('Subscribing to notifications:', notificationPath)
    subscribeToTopic(notificationPath, onNotificationReceived)
}

const subscribeThreadChannel = (email, onNotification) => {
    const path = '/public/user'
    console.log('Subscribing to thread:', path)
    subscribeToTopic(path, onNotification)
}

const subscribeThreadPrivateChannel = (email, onNotification) => {
    const path = `/private/${email}/user/thread`
    console.log('Subscribing to private thread:', path)
    subscribeToTopic(path, onNotification)
}

const disconnectSocket = () => {
    if (stompClient) {
        stompClient.deactivate()
    }
}

export {
    connectSocket,
    disconnectSocket,
    subscribeThreadChannel,
    subscribeThreadPrivateChannel,
    subscribeToNotifications
}
