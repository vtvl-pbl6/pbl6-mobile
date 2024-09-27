import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import UserInfo from '../../components/profile/ProfileInfo'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const loading = useSelector(state => state.loading)
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <ScreenWapper
            styles={{
                backgroundColor: currentColors.background
            }}
        >
            {/* Top */}
            <View style={styles.top}>
                {/* Header */}
                <View style={styles.navigator}>
                    <Pressable style={styles.navigatorButton}>
                        <Ionicons
                            name="globe-outline"
                            size={wp(6.2)}
                            style={[styles.icon, { color: currentColors.text }]}
                        />
                    </Pressable>
                    <Pressable style={styles.navigatorButton}>
                        <Ionicons
                            name="menu-outline"
                            size={wp(8)}
                            style={[styles.icon, { color: currentColors.text }]}
                        />
                    </Pressable>
                </View>
                {/* User Info */}
                <UserInfo />
                {/* Edit Button */}
                <Pressable
                    style={[
                        styles.editButton,
                        { borderColor: currentColors.gray }
                    ]}
                >
                    <Text
                        style={[
                            styles.editButtonText,
                            { color: currentColors.text }
                        ]}
                    >
                        {t('profile.editProfile')}
                    </Text>
                </Pressable>
            </View>
        </ScreenWapper>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    navigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },
    top: {
        paddingVertical: wp(2)
    },
    editButton: {
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderRadius: theme.radius.sm,
        paddingVertical: hp(1.2),
        marginVertical: hp(1)
    },
    editButtonText: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    }
})
