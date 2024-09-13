import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'

const LoginScreen = () => {
    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(login())
    }

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
