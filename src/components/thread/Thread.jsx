import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'
import ImageThread from './ImageThread'

const Thread = ({
    username,
    time,
    text,
    images,
    likes,
    comments,
    shares,
    send,
    avatar
}) => {
    const { t } = useTranslation()
    const insets = useSafeAreaInsets()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const [liked, setLiked] = useState(false)

    const toggleLike = () => {
        setLiked(!liked)
    }

    return (
        <View
            style={[styles.container, { borderColor: currentColors.lightGray }]}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.user}>
                    <Image
                        source={{ uri: avatar }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <Text
                        style={[styles.username, { color: currentColors.text }]}
                    >
                        {username}
                    </Text>
                    <Text style={[styles.time, { color: currentColors.gray }]}>
                        {time}
                    </Text>
                </View>
                <Pressable style={styles.more}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={24}
                        color={currentColors.gray}
                    />
                </Pressable>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.text, { color: currentColors.text }]}>
                    {text}
                </Text>
                <ImageThread images={images} />
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <Pressable style={styles.actionButton} onPress={toggleLike}>
                    <Ionicons
                        name={liked ? 'heart' : 'heart-outline'}
                        size={wp(6)}
                        color={liked ? theme.colors.rose : currentColors.gray}
                    />
                    <Text
                        style={[
                            styles.numberAction,
                            { color: currentColors.gray }
                        ]}
                    >
                        {likes}
                    </Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                    <Ionicons
                        name="chatbubble-outline"
                        size={wp(5.8)}
                        color={currentColors.gray}
                        style={{ transform: [{ scaleX: -1 }] }}
                    />
                    <Text
                        style={[
                            styles.numberAction,
                            { color: currentColors.gray }
                        ]}
                    >
                        {comments}
                    </Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                    <Ionicons
                        name="sync-outline"
                        size={wp(6)}
                        color={currentColors.gray}
                    />
                    <Text
                        style={[
                            styles.numberAction,
                            { color: currentColors.gray }
                        ]}
                    >
                        {shares}
                    </Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                    <Ionicons
                        name="paper-plane-outline"
                        size={wp(5.2)}
                        color={currentColors.gray}
                    />
                    <Text
                        style={[
                            styles.numberAction,
                            { color: currentColors.gray }
                        ]}
                    >
                        {send}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Thread

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(2),
        paddingVertical: 10,
        borderBottomWidth: 0.4
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: wp(2)
    },
    image: {
        width: wp(10),
        height: wp(10),
        borderRadius: 50
    },
    username: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    },
    time: {
        fontSize: wp(3.8)
    },
    more: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        paddingVertical: hp(1)
    },
    text: {
        fontSize: wp(3.8)
    },
    actions: {
        flexDirection: 'row',
        gap: wp(4),
        paddingVertical: hp(1)
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: wp(1)
    },
    numberAction: {
        fontSize: wp(3.8)
    }
})
