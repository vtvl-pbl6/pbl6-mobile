// [ TEST CODE ]
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
    connectSocket,
    disconnectSocket,
    subscribeToNotifications
} from '../../services/socketService'

const Notification = () => {
    const [notifications, setNotifications] = useState([])
    const [connected, setConnected] = useState(false)

    const onConnected = () => {
        console.log('Connected to WebSocket for notifications!')
        subscribeToNotifications(onNotificationReceived) // Đăng ký nhận thông báo
        setConnected(true)
    }

    const onNotificationReceived = payload => {
        const notificationData = JSON.parse(payload.body)
        console.log('Received notification:', notificationData)
        setNotifications(prevNotifications => [
            ...prevNotifications,
            notificationData
        ])
    }

    useEffect(() => {
        connectSocket(onConnected, console.error) // Kết nối socket

        return () => {
            disconnectSocket() // Ngắt kết nối khi component bị hủy
        }
    }, [])

    return (
        <View>
            <Text>Notifications:</Text>
            {notifications.map((notification, index) => (
                <Text key={index}>{notification.message}</Text>
            ))}
        </View>
    )
}

export default Notification
