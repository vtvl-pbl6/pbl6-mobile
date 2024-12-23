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
import {
    deleteMyThreadById,
    deleteRepostById
} from '../../store/slices/threadSlice'
import { daysUntilToday, hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'
import BaseModal from '../base/BaseModal'
import ActionButton from '../button/ActionButton'
import ImageThread from './ImageThread'
import ReportThreadModal from './ReportThreadModal'

const Thread = memo(
    ({ thread, onGoToProfile, onEdit, onPin, onDelete }) => {
        const dispatch = useDispatch()
        const { currentColors } = useTheme()
        const { t } = useLanguage()
        const navigation = useNavigation()
        const currentUser = useSelector(state => state.user.user)
        const handleError = useHandleError(navigation)

        const [loading, setLoading] = useState(false)
        const [imageDimensions, setImageDimensions] = useState([])
        const [dots, setDots] = useState('')
        const refOwnThreadAction = useRef()
        const refThreadAction = useRef()

        const [liked, setLiked] = useState(false)
        const [isShared, setIsShared] = useState(false)
        const [isUnsharedModalVisible, setIsUnsharedModalVisible] =
            useState(false)
        const [isReportModalVisible, setIsReportModalVisible] = useState(false)
        const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
        const [isLiking, setIsLiking] = useState(false)

        useEffect(() => {
            if (thread?.sharers && currentUser) {
                setIsShared(
                    thread.sharers.some(user => user.id === currentUser.id)
                )
            }
        }, [thread.sharers, currentUser])

        useEffect(() => {
            if (thread?.react_users && currentUser) {
                setLiked(
                    thread.react_users.some(user => user.id === currentUser.id)
                )
            }
        }, [thread, currentUser])

        const fetchImageDimensions = async files => {
            setLoading(true)
            try {
                const dimensions = await Promise.all(
                    files.map(file => ImageSize.getSize(file.url))
                )
                setImageDimensions(dimensions)
            } catch (error) {
                dispatch(
                    showToast({
                        message: t('compose.errorLoadImg'),
                        type: 'error'
                    })
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

        const handleGoToProfile = () => {
            if (typeof onGoToProfile === 'function') {
                onGoToProfile(thread.author.id)
            }
        }

        const handleShowActionSheet = isOwnThread => {
            if (isOwnThread) {
                refOwnThreadAction.current.open()
            }
        }

        const handleEdit = () => {
            if (typeof onEdit === 'function') {
                onEdit(thread)
                refOwnThreadAction.current.close()
            }
        }

        const handlePin = () => {
            if (typeof onPin === 'function') {
                onEdit(thread.id)
            }
        }

        const handleShowReport = () => {
            refOwnThreadAction.current.close()
            setTimeout(() => {
                setIsReportModalVisible(true)
            }, 300)
        }

        const handleComment = () => {
            navigation.navigate('ThreadDetail', { threadId: thread.id })
        }

        const handleDelete = async () => {
            refOwnThreadAction.current.close()
            setTimeout(() => {
                setIsDeleteModalVisible(true)
            }, 300)
        }

        const handleDeleteConfirm = async () => {
            if (thread.author.id != currentUser.id) return
            try {
                const response = await threadService.delete(thread.id)
                if (response.is_success) {
                    dispatch(deleteMyThreadById({ id: thread.id }))
                    dispatch(
                        showToast({
                            message: t('action.deleteSuccess'),
                            type: 'success'
                        })
                    )
                }
            } catch (error) {
                handleError(error)
            } finally {
                setIsDeleteModalVisible(false)
            }
        }

        const handleShareUnshared = () => {
            if (thread.author.id == currentUser.id) return
            if (isShared) {
                setIsUnsharedModalVisible(true)
            } else {
                performShareUnshare()
            }
        }

        const performShareUnshare = async () => {
            try {
                let response
                if (isShared) {
                    response = await threadService.unshared(thread.id)
                    if (response.is_success) {
                        setIsShared(false)
                        dispatch(deleteRepostById({ id: thread.id }))
                    }
                } else {
                    response = await threadService.share(thread.id)
                    if (response.is_success) {
                        setIsShared(true)
                        dispatch(
                            showToast({
                                message: t('action.shareSuccess'),
                                type: 'success'
                            })
                        )
                    }
                }
            } catch (error) {
                handleError(error)
            }
        }

        const handleUnsharedConfirm = () => {
            setIsUnsharedModalVisible(false)
            performShareUnshare()
        }

        const handleReportConfirm = async data => {
            setIsReportModalVisible(false)
            try {
                const response = await threadService.moderation(thread.id, data)
                if (response.is_success) {
                    dispatch(
                        showToast({
                            message: t('action.reportSuccess'),
                            type: 'success'
                        })
                    )
                }
            } catch (error) {
                handleError(error)
            }
        }

        const toggleLike = async () => {
            if (isLiking) return
            try {
                let response
                if (liked) {
                    response = await threadService.unlike(thread.id)
                    if (response.is_success) setLiked(false)
                } else {
                    response = await threadService.like(thread.id)
                    if (response.is_success) setLiked(true)
                }
            } catch (error) {
                console.log('LIKE ERROR: ', error)
            } finally {
                setTimeout(() => {
                    setIsLiking(false)
                }, 300)
            }
        }

        if (!thread || !thread.author) {
            return null
        }

        const isCreating = thread.status === 'CREATING'

        return (
            <View
                style={[
                    styles.container,
                    { borderColor: currentColors.lightGray }
                ]}
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
                                        {
                                            backgroundColor:
                                                currentColors.overlay
                                        }
                                    ]}
                                />
                            )}
                            {/* Header */}
                            <View
                                style={[
                                    styles.header,
                                    {
                                        paddingTop: wp(2),
                                        paddingHorizontal: wp(2)
                                    }
                                ]}
                            >
                                <Pressable
                                    style={styles.user}
                                    onPress={handleGoToProfile}
                                >
                                    {thread.author.avatar_file ? (
                                        <Image
                                            source={{
                                                uri: thread.author.avatar_file
                                                    .url
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
                                </Pressable>
                                <View style={styles.more}>
                                    <View
                                        style={{
                                            padding: wp(2),
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        {thread.status === 'PENDING' ? (
                                            <Text
                                                style={[
                                                    styles.text,
                                                    {
                                                        color: currentColors.gray
                                                    }
                                                ]}
                                            >
                                                {t('status.pending')}
                                            </Text>
                                        ) : thread.status === 'REJECTED' ? (
                                            <Text
                                                style={[
                                                    styles.text,
                                                    {
                                                        color: currentColors.gray
                                                    }
                                                ]}
                                            >
                                                {t('status.rejected')}
                                            </Text>
                                        ) : null}
                                    </View>
                                    <Pressable
                                        onPress={() =>
                                            handleShowActionSheet(
                                                thread.author.id ===
                                                    currentUser.id
                                            )
                                        }
                                    >
                                        {isCreating ? (
                                            <View style={styles.creating}>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        {
                                                            color: currentColors.text,
                                                            fontWeight:
                                                                theme.fonts
                                                                    .semibold
                                                        }
                                                    ]}
                                                >
                                                    {t('status.creating')}
                                                </Text>
                                                <View style={{ width: wp(5) }}>
                                                    <Text
                                                        style={{
                                                            color: currentColors.text
                                                        }}
                                                    >
                                                        {dots}
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <Ionicons
                                                name="ellipsis-horizontal"
                                                size={24}
                                                color={currentColors.gray}
                                            />
                                        )}
                                    </Pressable>
                                </View>
                            </View>

                            {/* Content */}
                            <View
                                style={[
                                    styles.content,
                                    { paddingHorizontal: wp(2) }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        { color: currentColors.text }
                                    ]}
                                >
                                    {thread.content == 'undefined'
                                        ? null
                                        : thread.content}
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
                                style={[styles.actions, { paddingLeft: wp(2) }]}
                            >
                                {/* Like */}
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

                                {/* Comment */}
                                <Pressable
                                    style={styles.actionButton}
                                    onPress={handleComment}
                                >
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
                                        {thread.comment_num}
                                    </Text>
                                </Pressable>

                                {/* Share */}
                                <Pressable
                                    style={styles.actionButton}
                                    onPress={handleShareUnshared}
                                >
                                    <Ionicons
                                        name="sync-outline"
                                        size={wp(6)}
                                        color={
                                            isShared
                                                ? theme.colors.green
                                                : currentColors.gray
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.numberAction,
                                            {
                                                color: isShared
                                                    ? theme.colors.green
                                                    : currentColors.gray
                                            }
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
                    height={hp(40)}
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
                            onPress={handleEdit}
                            buttonStyle={{
                                borderTopLeftRadius: theme.radius.xxl,
                                borderTopRightRadius: theme.radius.xxl,
                                borderBottomWidth: 0.6,
                                borderColor: currentColors.extraLightGray
                            }}
                        />
                        <ActionButton
                            iconName="alert-circle-outline"
                            label={t('action.report')}
                            onPress={handleShowReport}
                            buttonStyle={{
                                borderBottomWidth: 0.6,
                                borderColor: currentColors.extraLightGray
                            }}
                        />
                        <ActionButton
                            iconName="document-attach-outline"
                            label={t('action.pin')}
                            onPress={handlePin}
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

                {/* Modal confirm unshared */}
                <BaseModal
                    visible={isUnsharedModalVisible}
                    title={t('action.unshareConfirmTitle')}
                    message={t('action.unshareConfirmMessage')}
                    onConfirm={handleUnsharedConfirm}
                    onCancel={() => {
                        setIsUnsharedModalVisible(false)
                    }}
                />

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

                {/* Report modal */}
                <ReportThreadModal
                    visible={isReportModalVisible}
                    title={t('action.report')}
                    onConfirm={handleReportConfirm}
                    onCancel={() => {
                        setIsReportModalVisible(false)
                    }}
                />
            </View>
        )
    },
    (prevProps, nextProps) => {
        return prevProps.thread === nextProps.thread
    }
)

export default Thread

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
        fontSize: wp(4)
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
        paddingVertical: wp(3)
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
