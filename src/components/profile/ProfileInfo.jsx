import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'

const ProfileInfo = ({ user }) => {
    const { t } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    if (!user) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={currentColors.text} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <View style={styles.displayName}>
                    <Text style={[styles.name, { color: currentColors.text }]}>
                        {user.first_name + ' ' + user.last_name}
                    </Text>
                    <Text
                        style={[styles.username, { color: currentColors.text }]}
                    >
                        {user.display_name}
                    </Text>
                </View>
                {user.avatar_file ? (
                    <Image
                        source={{ uri: user.avatar_file.url }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                ) : (
                    <Ionicons
                        name="person-circle-outline"
                        size={wp(20)}
                        color={currentColors.lightGray}
                    />
                )}
            </View>
            <Text style={[styles.bio, { color: currentColors.text }]}>
                {user.bio}
            </Text>
            <Text
                style={[styles.followersNumber, { color: currentColors.gray }]}
            >
                {user.followers ? user.followers.length : 0}{' '}
                {t('profile.followers')}
            </Text>
        </View>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        gap: wp(1)
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    displayName: {
        gap: 4,
        justifyContent: 'center'
    },
    name: {
        fontSize: wp(7),
        fontWeight: theme.fonts.bold
    },
    username: {
        fontSize: wp(4.6)
    },
    avatar: {
        width: wp(18),
        height: wp(18),
        borderRadius: 50
    },
    bio: {
        width: wp(80),
        fontSize: wp(4)
    },
    followersNumber: {
        fontSize: wp(4)
    }
})
