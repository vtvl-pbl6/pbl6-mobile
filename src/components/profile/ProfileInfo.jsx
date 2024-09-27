import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'

const ProfileInfo = () => {
    const { t } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <View style={styles.displayName}>
                    <Text style={[styles.name, { color: currentColors.text }]}>
                        Mau Truong
                    </Text>
                    <Text
                        style={[styles.username, { color: currentColors.text }]}
                    >
                        03.nmt
                    </Text>
                </View>
                <Image
                    source={{
                        uri: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=d5ed816c4ddc4363ac787910fe5312ee&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYCu3VyjRoiAeps33DgGx6lAyUgiNTU4151iTsSjlBoB8g&oe=66FC13F8&_nc_sid=49cb7f'
                    }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>
            <Text style={[styles.bio, { color: currentColors.text }]}>
                Ai cũng xứng đáng đc chết chìm trong ánh mắt của nửa kia ❤️❤️❤️
            </Text>
            <Text
                style={[styles.followersNumber, { color: currentColors.gray }]}
            >
                206 {t('profile.followers')}
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
    user: {
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
