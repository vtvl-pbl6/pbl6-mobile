import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { capitalizeFirstLetter } from '../../utils'
import { hp, wp } from '../../utils/dimensionUtils'
import ListFollowed from './ListFollowed'
import ListFollowers from './ListFollowers'

const ProfileInfo = ({ user }) => {
    const { t } = useTranslation()
    const insets = useSafeAreaInsets()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const refFollowerSheet = useRef()

    const handleListFollow = () => {
        refFollowerSheet.current.open()
    }

    const [selectedTab, setSelectedTab] = useState('followers')
    const handleChangeTab = tab => {
        setSelectedTab(tab)
    }

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
                        @{user.display_name}
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
                        size={wp(18)}
                        color={currentColors.lightGray}
                    />
                )}
            </View>
            <Text style={[styles.bio, { color: currentColors.text }]}>
                {user.bio}
            </Text>
            <Pressable onPress={handleListFollow}>
                <Text
                    style={[
                        styles.followersNumber,
                        { color: currentColors.gray }
                    ]}
                >
                    {user.follower_num ? user.follower_num : 0}{' '}
                    {t('profile.followers')}
                </Text>
            </Pressable>

            {/* Bottom Sheet */}
            <RBSheet
                ref={refFollowerSheet}
                height={hp(100) - insets.top}
                openDuration={150}
                draggable={true}
                customStyles={{
                    container: {
                        backgroundColor: currentColors.background,
                        borderTopLeftRadius: theme.radius.xxl,
                        borderTopRightRadius: theme.radius.xxl
                    },
                    draggableIcon: {
                        backgroundColor: currentColors.gray,
                        width: wp(16)
                    }
                }}
            >
                {/* Tab selected */}
                <View
                    style={[
                        styles.tabContainer,
                        {
                            borderBottomColor: currentColors.lightGray,
                            backgroundColor: currentColors.background
                        }
                    ]}
                >
                    {/* Followers tab button */}
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            { marginRight: wp(2) },
                            selectedTab === 'followers' && [
                                styles.activeTab,
                                { borderBottomColor: currentColors.text }
                            ]
                        ]}
                        onPress={() => handleChangeTab('followers')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: currentColors.gray },
                                selectedTab === 'followers' && {
                                    color: currentColors.text
                                }
                            ]}
                        >
                            {capitalizeFirstLetter(t('profile.followers'))}
                        </Text>
                    </TouchableOpacity>

                    {/* Followed tab button */}
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            { marginLeft: wp(2) },
                            selectedTab === 'followed' && [
                                styles.activeTab,
                                { borderBottomColor: currentColors.text }
                            ]
                        ]}
                        onPress={() => handleChangeTab('followed')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: currentColors.gray },
                                selectedTab === 'followed' && {
                                    color: currentColors.text
                                }
                            ]}
                        >
                            {t('profile.followed')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* List follower */}
                {selectedTab === 'followers' && <ListFollowers />}

                {/* List followed */}
                {selectedTab === 'followed' && <ListFollowed />}
            </RBSheet>
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
        paddingVertical: wp(2),
        fontSize: wp(4)
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5
    },
    tabButton: {
        paddingVertical: hp(1),
        paddingBottom: hp(2),
        width: wp(48),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        fontSize: wp(4),
        fontWeight: 'bold'
    },
    activeTab: {
        borderBottomWidth: 1
    }
})
