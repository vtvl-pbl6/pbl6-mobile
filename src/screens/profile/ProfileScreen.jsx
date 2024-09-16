import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'

const ProfileScreen = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
