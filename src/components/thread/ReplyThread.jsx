import React, { memo, useEffect, useState } from 'react'
import { Facebook } from 'react-content-loader/native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ImageSize from 'react-native-image-size'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { daysUntilToday, wp } from '../../utils'
import ImageThread from './ImageThread'

const ReplyThread = memo(({ thread, action = true }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageDimensions, setImageDimensions] = useState([])
    const [dots, setDots] = useState('')

    const toggleLike = () => {
        setLiked(!liked)
    }

    const fetchImageDimensions = async files => {
        setLoading(true)
        try {
            const dimensions = await Promise.all(
                files.map(file => ImageSize.getSize(file.url))
            )
            setImageDimensions(dimensions)
        } catch (error) {
            dispatch(
                showToast({ message: t('compose.errorLoadImg'), type: 'error' })
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (thread.files && thread.files.length > 0) {
            fetchImageDimensions(thread.files)
        }
    }, [thread.files])

    useEffect(() => {
        if (thread.status === 'CREATING') {
            const interval = setInterval(() => {
                setDots(prevDots => {
                    if (prevDots.length >= 3) {
                        return ''
                    }
                    return prevDots + '.'
                })
            }, 500)

            return () => clearInterval(interval)
        }
    }, [thread.status])

    if (!thread || !thread.author) {
        return null
    }

    const isCreating = thread.status === 'CREATING'

    return (
        <View
            style={[styles.container, { borderColor: currentColors.lightGray }]}
        >
            <View>
                {/* Loader */}
                {loading && (
                    <View style={{ padding: wp(2) }}>
                        <Facebook />
                    </View>
                )}

                {/* Conditional rendering based on loading state */}
                {!loading && (
                    <View>
                        {isCreating && (
                            <View
                                style={[
                                    styles.overlay,
                                    { backgroundColor: currentColors.overlay }
                                ]}
                            />
                        )}
                        {/* Header */}
                        <View
                            style={[
                                styles.header,
                                { paddingTop: wp(2), paddingHorizontal: wp(2) }
                            ]}
                        >
                            <View style={styles.user}>
                                {thread.author.avatar_file ? (
                                    <Image
                                        source={{
                                            uri: thread.author.avatar_file.url
                                        }}
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
                                    style={[
                                        styles.username,
                                        { color: currentColors.text }
                                    ]}
                                >
                                    {thread.author.display_name}
                                </Text>
                                <Text
                                    style={[
                                        styles.time,
                                        { color: currentColors.gray }
                                    ]}
                                >
                                    {daysUntilToday(thread.created_at)}
                                </Text>
                            </View>
                            <Pressable style={styles.more}>
                                {action && (
                                    <Ionicons
                                        name="ellipsis-horizontal"
                                        size={24}
                                        color={currentColors.gray}
                                    />
                                )}
                            </Pressable>
                        </View>

                        {/* Content */}
                        <View
                            style={[
                                styles.content,
                                { paddingRight: wp(2), paddingLeft: wp(14) }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    { color: currentColors.text }
                                ]}
                            >
                                {thread.content}
                            </Text>
                            {Array.isArray(thread.files) &&
                            thread.files.length > 0 ? (
                                <ImageThread
                                    files={thread.files}
                                    imageDimensions={imageDimensions}
                                />
                            ) : null}
                        </View>

                        {/* Actions */}
                        <View
                            style={[
                                styles.actions,
                                { paddingRight: wp(2), paddingLeft: wp(14) }
                            ]}
                        >
                            <Pressable
                                style={styles.actionButton}
                                onPress={toggleLike}
                            >
                                <Ionicons
                                    name={liked ? 'heart' : 'heart-outline'}
                                    size={wp(6)}
                                    color={
                                        liked
                                            ? theme.colors.rose
                                            : currentColors.gray
                                    }
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
                                    {thread.comments
                                        ? thread.comments.length
                                        : 0}
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
                )}
            </View>
        </View>
    )
})

export default ReplyThread

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.4
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
    },
    text: {
        fontSize: wp(3.8)
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
    creating: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        paddingBottom: wp(2)
    },
    actions: {
        flexDirection: 'row',
        paddingBottom: wp(2),
        gap: wp(6)
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberAction: {
        fontSize: wp(3.6),
        marginLeft: wp(1)
    }
})
