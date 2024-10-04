import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { daysUntilToday, hp, wp } from '../../utils'
import ImageThread from './ImageThread'

const Thread = ({ thread }) => {
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

    if (!thread || !thread.author) {
        return null
    }

    return (
        <View
            style={[styles.container, { borderColor: currentColors.lightGray }]}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.user}>
                    {thread.author.avatar_file ? (
                        <Image
                            source={{ uri: thread.author.avatar_file.url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons
                            name="person-circle-outline"
                            size={wp(10)}
                            color={currentColors.lightGray}
                        />
                    )}
                    <Text
                        style={[styles.username, { color: currentColors.text }]}
                    >
                        {thread.author.display_name}
                    </Text>
                    <Text style={[styles.time, { color: currentColors.gray }]}>
                        {daysUntilToday(thread.created_at)}
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
                    {thread.content}
                </Text>
                {Array.isArray(thread.files) && thread.files.length > 0 ? (
                    <ImageThread files={thread.files} />
                ) : null}
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
                        {thread.reaction_num}
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
                        {thread.comments ? thread.comments.length : 0}
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
                        {thread.shared_num}
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
