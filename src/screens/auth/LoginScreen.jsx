import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'

const LoginScreen = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleLogin = () => {
        dispatch(login())
    }

    return (
        <View style={styles.container}>
            <Text>{t('textLogin')}</Text>
            <Button title={t('login')} onPress={handleLogin} />
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
