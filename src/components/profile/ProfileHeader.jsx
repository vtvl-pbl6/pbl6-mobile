import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { React } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { hp, wp } from '../../utils'
import ProfileInfoLoader from '../load/ProfileInfoLoader'
import ProfileInfo from './ProfileInfo'

const ProfileHeader = ({ user, loadUserInfo }) => {
    const { t } = useLanguage()
    const { currentColors } = useTheme()
    const navigation = useNavigation()

    if (loadUserInfo) {
        return <ProfileInfoLoader />
    }

    return (
        <View style={styles.top}>
            <View style={styles.navigator}>
                <Pressable style={styles.navigatorButton}>
                    <Ionicons
                        name="globe-outline"
                        size={wp(6.2)}
                        style={[styles.icon, { color: currentColors.text }]}
                    />
                </Pressable>
                <Pressable
                    style={styles.navigatorButton}
                    onPress={() =>
                        navigation.navigate('Profile', {
                            screen: 'SettingScreen'
                        })
                    }
                >
                    <Ionicons
                        name="menu-outline"
                        size={wp(8)}
                        style={[styles.icon, { color: currentColors.text }]}
                    />
                </Pressable>
            </View>
            {user && <ProfileInfo user={user} />}
            <Pressable
                style={[styles.editButton, { borderColor: currentColors.gray }]}
                onPress={() =>
                    navigation.navigate('Profile', {
                        screen: 'EditProfile'
                    })
                }
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
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    top: {
        paddingVertical: wp(2)
    },
    navigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },
    editButton: {
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderRadius: theme.radius.sm,
        paddingVertical: hp(1.2),
        marginTop: hp(1)
    },
    editButtonText: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    }
})
