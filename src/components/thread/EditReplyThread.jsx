import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import threadService from '../../services/threadServices'
import { setLoading, showToast } from '../../store/slices'
import {
    updateCommentById,
    updateMyThreadById
} from '../../store/slices/threadSlice'
import { hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'
import Loading from '../Loading'
import ImagePreview from './ImagePreview'

const EditReplyThread = ({ threadId, onClose }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const route = useRoute()
    const navigation = useNavigation()

    const user = useSelector(state => state.user.user)
    const update = useSelector(state => state.update)
    const loading = useSelector(state => state.loading)

    const [selectedScope, setSelectedScope] = useState(null)
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const [content, setContent] = useState('')
    const [load, setLoad] = useState(false)
    const [thread, setThread] = useState(false)

    const handleError = useHandleError(navigation)

    const scopeOptions = [
        { label: t('editThread.scope.everybody'), value: 'PUBLIC' },
        { label: t('editThread.scope.friend'), value: 'FRIEND_ONLY' },
        { label: t('editThread.scope.private'), value: 'PRIVATE' }
    ]

    useEffect(() => {
        const fetchThread = async () => {
            if (load) return
            setLoad(true)
            try {
                const response = await threadService.getById(threadId)
                const { data, is_success } = response
                if (is_success) {
                    setThread(data)
                }
            } catch (error) {
                handleError(error)
            } finally {
                setLoad(false)
            }
        }
        fetchThread()
    }, [threadId])

    useEffect(() => {
        if (thread) {
            if (thread.files?.length > 0) {
                setSelectedImages(
                    thread.files.map(file => ({ id: file.id, url: file.url }))
                )
            }
            setContent(thread.content || '')
            setSelectedScope(thread.visibility)
        }
    }, [thread])

    const handleRemoveImage = index => {
        setSelectedImages(prevImages =>
            prevImages.filter((_, i) => i !== index)
        )
    }

    const handleSubmit = async () => {
        if (!content && selectedImages.length === 0) {
            dispatch(
                showToast({ message: t('editThread.noContent'), type: 'info' })
            )
            return
        }

        const delete_file_ids =
            thread.files && thread.files.length > 0
                ? thread.files
                      .filter(
                          file =>
                              !selectedImages.some(
                                  selected => selected.id === file.id
                              )
                      )
                      .map(file => file.id)
                : []

        const data = {
            content: content,
            delete_file_ids: delete_file_ids
        }

        try {
            dispatch(
                showToast({ message: t('editThread.updating'), type: 'info' })
            )

            dispatch(setLoading(true))
            const response = await threadService.update(thread.id, data)

            if (response.is_success) {
                dispatch(
                    updateCommentById({
                        id: threadId,
                        newData: response.data
                    })
                )
                dispatch(
                    showToast({
                        message: t('editThread.success'),
                        type: 'success'
                    })
                )
                setSelectedImages([])
                setContent('')
                dispatch(
                    updateMyThreadById({
                        id: thread.id,
                        newData: response.data
                    })
                )
                onClose(true)
            }
        } catch (error) {
            handleError(error)
            console.error('Error updating thread:', error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    if (load) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Loading />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                {
                    backgroundColor: currentColors.background
                }
            ]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Header */}
            <View
                style={[
                    styles.header,
                    { borderBottomColor: currentColors.lightGray }
                ]}
            >
                <Text
                    style={[
                        styles.newThreadText,
                        { color: currentColors.text }
                    ]}
                >
                    {t('editThread.editThread')}
                </Text>
            </View>

            {/* Scrollable Body */}
            <ScrollView
                style={styles.body}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.post}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* Left */}
                        <View style={styles.left}>
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
                                    size={wp(10)}
                                    color={currentColors.lightGray}
                                />
                            )}
                            <View style={styles.lineContainer}>
                                <View
                                    style={[
                                        styles.line,
                                        {
                                            backgroundColor:
                                                currentColors.lightGray
                                        }
                                    ]}
                                ></View>
                            </View>
                        </View>

                        {/* Right */}
                        <View style={styles.right}>
                            <Text
                                style={[
                                    styles.username,
                                    { color: currentColors.text }
                                ]}
                            >
                                {user?.display_name}
                            </Text>
                            {/* Content input */}
                            <TextInput
                                value={content}
                                multiline={true}
                                textAlignVertical="top"
                                autoFocus={true}
                                style={[
                                    styles.textInput,
                                    { color: currentColors.text }
                                ]}
                                placeholder={t('editThread.addThread')}
                                placeholderTextColor={currentColors.gray}
                                onChangeText={setContent}
                            />
                            {/* Display selected images */}
                            <ImagePreview
                                images={selectedImages.map(image => image.url)}
                                onRemove={handleRemoveImage}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.addThead}>
                    <View style={styles.left}>
                        {user?.avatar_file ? (
                            <Image
                                source={{
                                    uri: user.avatar_file.url
                                }}
                                style={styles.imageThread}
                                resizeMode="cover"
                            />
                        ) : (
                            <Ionicons
                                name="person-circle-outline"
                                size={wp(10)}
                                color={currentColors.lightGray}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View
                style={[
                    styles.footer,
                    { backgroundColor: currentColors.background }
                ]}
            >
                <Pressable
                    onPress={() => setDropdownVisible(!isDropdownVisible)}
                >
                    <Text style={{ color: currentColors.gray }}>
                        {
                            scopeOptions.find(
                                option => option.value === selectedScope
                            )?.label
                        }
                    </Text>
                </Pressable>

                <TouchableOpacity
                    style={[
                        styles.createButton,
                        {
                            backgroundColor: loading
                                ? currentColors.lightGray
                                : currentColors.text
                        }
                    ]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text
                        style={[
                            styles.createButtonText,
                            { color: currentColors.background }
                        ]}
                    >
                        {loading
                            ? t('editThread.posting')
                            : t('editThread.submit')}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditReplyThread

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingVertical: hp(2.4),
        borderBottomWidth: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        position: 'relative'
    },
    cancelButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 14
    },
    cancelButtonText: {
        fontSize: wp(4)
    },
    newThreadText: {
        fontSize: wp(4.2),
        fontWeight: theme.fonts.bold
    },
    body: {
        flex: 1
    },
    post: {
        paddingHorizontal: wp(2),
        paddingVertical: wp(4)
    },
    left: {
        width: wp(12),
        alignItems: 'center'
    },
    image: {
        width: wp(10),
        height: wp(10),
        borderRadius: 50
    },
    lineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp(2)
    },
    line: {
        height: '100%',
        width: 1.6,
        minHeight: wp(10),
        backgroundColor: 'gray'
    },
    right: {
        flex: 1,
        marginLeft: wp(2)
    },
    username: {
        fontSize: wp(4),
        fontWeight: theme.fonts.medium
    },
    textInput: {
        fontSize: wp(3.6)
    },
    action: {
        flexDirection: 'row',
        marginTop: wp(2)
    },
    actionButton: {
        marginRight: wp(2)
    },
    actionIcon: {},
    addThead: {
        paddingBottom: wp(2),
        flexDirection: 'row',
        paddingHorizontal: wp(2)
    },
    imageThread: {
        width: wp(8),
        height: wp(8),
        borderRadius: 50
    },
    footer: {
        paddingHorizontal: wp(4),
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    createButton: {
        paddingVertical: wp(2),
        paddingHorizontal: wp(4),
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    createButtonText: {
        fontSize: wp(4),
        fontWeight: theme.fonts.medium
    },
    dropdown: {
        position: 'absolute',
        bottom: 40,
        left: wp(2),
        width: wp(46),
        borderRadius: 5,
        zIndex: 2,
        shadow: '#737373',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    },
    dropdownItem: {
        padding: wp(3),
        borderBottomWidth: 0.5
    }
})
