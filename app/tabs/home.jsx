import React from 'react'
import { Button, StyleSheet, Text } from 'react-native'
import ScreenWapper from '../../components/ScreenWapper'

const Home = () => {
    const handerLogin = () => {
        alert("Login clicked!")
    }
    return (
        <ScreenWapper>
            <Text>Home</Text>
            <Button title='Login' onPress={() => handerLogin()}></Button>
        </ScreenWapper>
    )
}

export default Home

const styles = StyleSheet.create({})