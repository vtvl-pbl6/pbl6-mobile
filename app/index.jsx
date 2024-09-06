import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Text } from 'react-native'
import ScreenWapper from '../components/ScreenWapper'

const index = () => {
    const router = useRouter()
    return (
        <ScreenWapper>
            <Text>Index</Text>
            <Button title="welcome" onPress={() => router.push('welcome')}/>
            <Button title="home" onPress={() => router.push('tabs/home')}/>
            <Button title="profile" onPress={() => router.push('tabs/profile')}/>
        </ScreenWapper>
    )
}

export default index