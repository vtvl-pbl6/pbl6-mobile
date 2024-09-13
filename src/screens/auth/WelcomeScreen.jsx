import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>WelcomeScreen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WelcomeScreen
