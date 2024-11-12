import { Ionicons } from '@expo/vector-icons'
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
import BaseModal from '../base/BaseModal'

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
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleConfirm = () => {
        setIsModalVisible(false)
        handleUnFollow()
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleGotoProfile = () => {
        if (typeof onGoToProfile === 'function') {
            onGoToProfile(id)
        }
    }

    const handleFollow = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.follow(id)

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
            const response = await userService.unfollow(id)

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

    const showModal = () => {
        setIsModalVisible(true)
    }

    return (
        <Pressable
            style={[styles.card, { borderColor: currentColors.lightGray }]}
            onPress={handleGotoProfile}
        >
            {avatar_file ? (
                <Image
                    source={{ uri: avatar_file.url }}
                    style={styles.avatar}
                />
            ) : (
                <Ionicons
                    name="person-circle-outline"
                    size={wp(18)}
                    color={currentColors.lightGray}
                    style={styles.avatarPlaceholder}
                />
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
                    onPress={showModal}
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
                    onPress={handleFollow}
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
            <BaseModal
                visible={isModalVisible}
                title={t('search.unfollow') + ' ' + user.display_name}
                message={t('search.confirmUnfollow')}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
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
        borderRadius: 50,
        marginRight: wp(2)
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
