import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import userService from '../../services/userServices'
import { wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'
import Loading from '../Loading'

const UserInfoCard = ({ user, onGoToProfile }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const navigation = useNavigation()
    const handleError = useHandleError(navigation)

    const {
        id,
        email,
        first_name,
        last_name,
        display_name,
        follower_num,
        avatar_file,
        is_followed_by_current_user
    } = user

    const update = useSelector(state => state.update)
    const [loading, setLoading] = useState(false)
    const [isFollowed, setIsFollowed] = useState(is_followed_by_current_user)
    const [followerNum, setFollowerNum] = useState(follower_num)

    const handleGotoProfile = () => {
        if (typeof onGoToProfile === 'function') {
            onGoToProfile(id)
        }
    }

    const handleFollow = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.followUser(id)

            if (response.is_success) {
                setIsFollowed(response.is_success)
                const prev = followerNum
                setFollowerNum(prev + 1)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUnFollow = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.unfollowUser(id)

            if (response.is_success) {
                setIsFollowed(!response.is_success)
                const prev = followerNum
                setFollowerNum(prev - 1)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Pressable
            style={[styles.card, { borderColor: currentColors.lightGray }]}
            onPress={handleGotoProfile}
        >
            {avatar_file ? (
                <Image source={{ uri: avatar_file }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarPlaceholder} />
            )}
            <View style={styles.infoContainer}>
                <Text
                    style={[styles.displayName, { color: currentColors.text }]}
                >
                    {display_name}
                </Text>
                <Text style={styles.name}>
                    {first_name} {last_name}
                </Text>
                <Text style={styles.followers}>
                    {followerNum ?? 0} {t('search.followers')}
                </Text>
            </View>
            {loading ? (
                <View style={styles.followButton}>
                    <Loading size="small" />
                </View>
            ) : isFollowed ? (
                <Pressable
                    style={[
                        styles.followButton,
                        { borderColor: currentColors.lightGray }
                    ]}
                    onPress={handleUnFollow} // Call the parent unfollow handler
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
                    onPress={handleFollow} // Call the parent follow handler
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
        </Pressable>
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
