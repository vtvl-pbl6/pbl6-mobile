import { useNavigation } from '@react-navigation/native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Facebook } from 'react-content-loader/native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ImageSize from 'react-native-image-size'
import RBSheet from 'react-native-raw-bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import threadService from '../../services/threadServices'
import { showToast } from '../../store/slices'
import { deleteCommentById } from '../../store/slices/threadSlice'
import { daysUntilToday, hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'
import BaseModal from '../base/BaseModal'
import ActionButton from '../button/ActionButton'
import EditReplyThread from './EditReplyThread'
import ImageThread from './ImageThread'

const ReplyThread = memo(({ thread, action = true }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const navigation = useNavigation()
    const user = useSelector(state => state.user.user)
    const handleError = useHandleError(navigation)

    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageDimensions, setImageDimensions] = useState([])
    const [dots, setDots] = useState('')
    const [replyThreadId, setReplyThreadId] = useState(null)
    const refOwnThreadAction = useRef()
    const refEditThreadAction = useRef()
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

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

    const handleShowBottomSheet = () => {
        if (user.id == thread.author.id) refOwnThreadAction.current.open()
    }

    const handleEdit = id => {
        refOwnThreadAction.current.close()
        setReplyThreadId(id)
        setTimeout(() => {
            refEditThreadAction.current.open()
        }, 300)
    }

    const handleDelete = async () => {
        refOwnThreadAction.current.close()
        setTimeout(() => {
            setIsDeleteModalVisible(true)
        }, 300)
    }

    const handleDeleteConfirm = async () => {
        if (thread.author.id != user.id) return
        try {
            const response = await threadService.delete(thread.id)
            if (response.is_success) {
                dispatch(
                    deleteCommentById({
                        id: thread.id,
                        parent_id: thread.parent_thread.id,
                        type: 'DELETE_COMMENT',
                        comment: thread
                    })
                )
                dispatch(
                    showToast({
                        message: t('action.deleteSuccess'),
                        type: 'success'
                    })
                )
            }
        } catch (error) {
            console.log(error)

            handleError(error)
        } finally {
            setIsDeleteModalVisible(false)
        }
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
                            <Pressable
                                style={styles.more}
                                onPress={handleShowBottomSheet}
                            >
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

            {/* Bottom Sheet Own Thread Action */}
            <RBSheet
                customStyles={{
                    container: [
                        styles.bottomSheetContainer,
                        { backgroundColor: currentColors.extraLightGray }
                    ],
                    draggableIcon: {
                        backgroundColor: currentColors.gray,
                        width: wp(10)
                    }
                }}
                height={hp(35)}
                openDuration={250}
                ref={refOwnThreadAction}
                draggable={true}
            >
                <View
                    style={[
                        styles.contentBottomSheetContainer,
                        { backgroundColor: currentColors.extraLightGray }
                    ]}
                >
                    <ActionButton
                        iconName="settings-outline"
                        label={t('action.edit')}
                        onPress={() => handleEdit(thread.id)}
                        buttonStyle={{
                            borderTopLeftRadius: theme.radius.xxl,
                            borderTopRightRadius: theme.radius.xxl,
                            borderBottomWidth: 0.6,
                            borderColor: currentColors.extraLightGray
                        }}
                    />
                    <ActionButton
                        iconName="document-attach-outline"
                        label={t('action.pin')}
                        // onPress={handlePin}
                        onPress={() => {}}
                        buttonStyle={{
                            borderBottomLeftRadius: theme.radius.xxl,
                            borderBottomRightRadius: theme.radius.xxl
                        }}
                    />

                    <ActionButton
                        iconName="trash-outline"
                        label={t('action.delete')}
                        onPress={handleDelete}
                        buttonStyle={{
                            borderRadius: theme.radius.xxl,
                            marginTop: wp(4)
                        }}
                        color={theme.colors.rose}
                    />
                </View>
            </RBSheet>

            {/* Bottom Sheet edit thread */}
            <RBSheet
                customStyles={{
                    container: [
                        styles.bottomSheetContainer,
                        { backgroundColor: currentColors.background }
                    ]
                }}
                height={hp(56)}
                openDuration={250}
                ref={refEditThreadAction}
            >
                <EditReplyThread threadId={replyThreadId} />
            </RBSheet>

            {/* Modal confirm delete */}
            <BaseModal
                visible={isDeleteModalVisible}
                title={t('action.deleteThreadTitle')}
                message={t('action.deleteThreadMessage')}
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    setIsDeleteModalVisible(false)
                }}
            />
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
    },
    bottomSheetContainer: {
        borderTopLeftRadius: theme.radius.xxl,
        borderTopRightRadius: theme.radius.xxl
    },
    contentBottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
        padding: wp(4)
    }
})
