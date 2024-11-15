import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { wp } from '../../utils'

const AvatarNotification = ({ user, type, currentColors }) => {
    return (
        <View style={{ position: 'relative' }}>
            {user?.avatar_file ? (
                <Image
                    source={{
                        uri: user.avatar_file.url
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Ionicons
                    name="person-circle-outline"
                    size={wp(16)}
                    color={currentColors.lightGray}
                />
            )}
            {type === 'FOLLOW' ? (
                <View style={[styles.type, { backgroundColor: '#6D3CEF' }]}>
                    <Ionicons name="person" size={wp(3)} color={'white'} />
                </View>
            ) : type === 'LIKE' ? (
                <View></View>
            ) : type === 'COMMENT' ? (
                <View style={[styles.type, { backgroundColor: '#24C3FE' }]}>
                    <Ionicons name="arrow-undo" size={wp(3)} color={'white'} />
                </View>
            ) : null}
        </View>
    )
}

export default AvatarNotification

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        width: wp(14),
        height: wp(14)
    },
    type: {
        position: 'absolute',
        bottom: wp(0),
        right: wp(0),
        width: wp(5),
        height: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }
})
