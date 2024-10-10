// [ TEST CODE ]
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Text, TextInput, View } from 'react-native'
import {
    connectSocket,
    disconnectSocket,
    sendMessage,
    subscribeToChat
} from '../../services/socketService'

const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([])
    const [userData, setUserData] = useState({
        username: '',
        message: '',
        connected: false
    })

    const onConnected = () => {
        console.log('Connected to WebSocket!')
        subscribeToChat(onMessageReceived) // Đăng ký nhận tin nhắn chat
        userJoin()
        setUserData(prevData => ({ ...prevData, connected: true }))
    }

    const onMessageReceived = payload => {
        const payloadData = JSON.parse(payload.body)
        console.log('Received chat message:', payloadData)

        if (payloadData.status === 'MESSAGE') {
            setPublicChats(prevChats => [...prevChats, payloadData])
        }
    }

    const userJoin = () => {
        const chatMessage = {
            senderName: userData.username,
            status: 'JOIN'
        }
        sendMessage(chatMessage) // Gửi tin nhắn tham gia phòng chat
    }

    const sendValue = () => {
        if (userData.message.trim()) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: 'MESSAGE'
            }
            sendMessage(chatMessage) // Gửi tin nhắn
            setUserData(prevData => ({ ...prevData, message: '' }))
        }
    }

    useEffect(() => {
        return () => {
            disconnectSocket() // Ngắt kết nối khi component bị hủy
        }
    }, [])

    return (
        <View>
            {userData.connected ? (
                <View>
                    <TextInput
                        value={userData.message}
                        onChangeText={text =>
                            setUserData({ ...userData, message: text })
                        }
                        placeholder="Enter message"
                    />
                    <Button title="Send" onPress={sendValue} />
                    <FlatList
                        data={publicChats}
                        renderItem={({ item }) => (
                            <View>
                                <Text>
                                    {item.senderName}: {item.message}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            ) : (
                <View>
                    <TextInput
                        value={userData.username}
                        onChangeText={text =>
                            setUserData({ ...userData, username: text })
                        }
                        placeholder="Enter username"
                    />
                    <Button
                        title="Connect"
                        onPress={() =>
                            connectSocket(onConnected, console.error)
                        }
                    />
                </View>
            )}
        </View>
    )
}

export default ChatRoom
