import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { wp } from '../../utils'

const UserInfoCard = ({ user, onFollow, onUnfollow }) => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const {
        email,
        first_name,
        last_name,
        display_name,
        follower_num,
        avatar_file,
        is_followed_by_current_user
    } = user

    return (
        <View style={[styles.card, { borderColor: currentColors.lightGray }]}>
            {avatar_file ? (
                <Image source={{ uri: avatar_file }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarPlaceholder} />
            )}
            <View style={styles.infoContainer}>
                <Text style={styles.displayName}>{display_name}</Text>
                <Text style={styles.name}>
                    {first_name} {last_name}
                </Text>
                <Text style={styles.followers}>
                    {follower_num ?? 0} {t('search.followers')}
                </Text>
            </View>
            {is_followed_by_current_user ? (
                <Pressable
                    style={[
                        styles.followButton,
                        { borderColor: currentColors.lightGray }
                    ]}
                    onPress={() => onUnfollow(user.id)} // Call the parent unfollow handler
                >
                    <Text
                        style={[
                            styles.followButtonText,
                            { color: currentColors.gray }
                        ]}
                    >
                        {t('search.unfollow')}
                    </Text>
                </Pressable>
            ) : (
                <Pressable
                    style={[
                        styles.followButton,
                        { borderColor: currentColors.lightGray }
                    ]}
                    onPress={() => onFollow(user.id)} // Call the parent follow handler
                >
                    <Text
                        style={[
                            styles.followButtonText,
                            { color: currentColors.text }
                        ]}
                    >
                        {t('search.follow')}
                    </Text>
                </Pressable>
            )}
        </View>
    )
}

export default UserInfoCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: wp(4),
        borderRadius: theme.radius.md,
        borderBottomWidth: 0.5
    },
    avatar: {
        width: wp(16),
        height: wp(16),
        borderRadius: 50,
        marginRight: wp(4)
    },
    avatarPlaceholder: {
        width: wp(16),
        height: wp(16),
        borderRadius: 50,
        backgroundColor: '#ccc',
        marginRight: wp(4)
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 4
    },
    displayName: {
        fontSize: wp(4),
        fontWeight: theme.fonts.bold
    },
    name: {
        fontSize: wp(4),
        color: '#555'
    },
    followers: {
        fontSize: wp(4),
        color: '#666',
        marginVertical: 10
    },
    followButton: {
        borderWidth: 1,
        borderRadius: theme.radius.md,
        width: wp(35),
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    followButtonText: {
        fontSize: wp(3.6),
        fontWeight: theme.fonts.bold
    }
})
