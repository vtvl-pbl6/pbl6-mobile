import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { logout } from '../../store/slices'
import { wp } from '../../utils'

const SettingScreen = () => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const handleLogout = async () => {
        try {
            dispatch(logout())
        } catch (error) {
            console.error('Error clearing tokens', error)
        }
    }

    return (
        <View styles={styles.functions}>
            <Divider styles={{ backgroundColor: currentColors.lightGray }} />
            <Pressable style={styles.actionButton} onPress={handleLogout}>
                <Text style={styles.logout}>{t('setting.logout')}</Text>
            </Pressable>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    functions: {},
    actionButton: {
        padding: wp(5)
    },
    logout: {
        fontSize: wp(4),
        color: theme.colors.rose
    }
})
