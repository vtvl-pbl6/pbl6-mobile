import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    Keyboard,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { ImagePreview } from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import threadServices from '../../services/threadServices'
import { setLoading, setUpdate, showToast } from '../../store/slices'
import { hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const NewThread = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const insets = useSafeAreaInsets()

    const [paddingBottom, setPaddingBottom] = useState(insets.bottom)
    const loading = useSelector(state => state.loading)
    const user = useSelector(state => state.user.user)
    const update = useSelector(state => state.update)

    const [selectedScope, setSelectedScope] = useState('PUBLIC')
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const handleError = useHandleError(navigation)

    const scopeOptions = [
        { label: t('compose.scope.everybody'), value: 'PUBLIC' },
        { label: t('compose.scope.friend'), value: 'FRIEND_ONLY' },
        { label: t('compose.scope.private'), value: 'PRIVATE' }
    ]

    const inputRef = useRef(null)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setPaddingBottom(0)
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setPaddingBottom(insets.bottom)
            }
        )

        // Cleanup listeners on unmount
        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [insets.bottom])

    const requestPermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            dispatch(
                showToast({
                    message: t('compose.noAccessToLibrary'),
                    type: 'warning'
                })
            )
            return false
        }
        return true
    }

    const selectImageFromLibrary = async () => {
        const hasPermission = await requestPermission()
        if (!hasPermission) return

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1
        })

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri)
            setSelectedImages(prevImages => [...prevImages, ...newImages])
        }
        inputRef.current?.focus()
    }

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            dispatch(
                showToast({
                    message: t('compose.cameraPermission'),
                    type: 'warning'
                })
            )
            return
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 1
        })

        if (!result.canceled) {
            setSelectedImages(prevImages => [
                ...prevImages,
                result.assets[0].uri
            ])
        }
        inputRef.current?.focus()
    }

    const handleRemoveImage = index => {
        setSelectedImages(prevImages =>
            prevImages.filter((_, i) => i !== index)
        )
    }

    const handleSubmit = async () => {
        const contentText = inputRef.current.value

        if (!contentText && selectedImages.length === 0) {
            dispatch(
                showToast({ message: t('compose.noContent'), type: 'info' })
            )
            return
        }

        const formData = new FormData()

        formData.append('content', contentText)
        formData.append('visibility', selectedScope)

        for (const file of selectedImages) {
            const fileInfo = await FileSystem.getInfoAsync(file)

            if (fileInfo.exists) {
                formData.append('files', {
                    // uri: fileInfo.uri,
                    name: fileInfo.uri.split('/').pop(),
                    type: fileInfo.mimeType || 'image/jpeg',
                    uri:
                        Platform.OS === 'ios'
                            ? fileInfo.uri.replace('file://', '')
                            : fileInfo.uri
                })
            }
        }

        try {
            dispatch(
                showToast({ message: t('compose.creating'), type: 'info' })
            )

            dispatch(setLoading(true))

            await threadServices.createThread(formData)

            dispatch(
                showToast({ message: t('compose.success'), type: 'success' })
            )

            // Clear input and images after submission
            setSelectedImages([])
            if (inputRef.current) {
                inputRef.current.clear()
            }

            dispatch(setUpdate(true))
        } catch (error) {
            handleError(error)
            console.error('Error creating thread:', error)
        } finally {
            dispatch(setLoading(false))
            dispatch(setUpdate(false))
        }
    }

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                {
                    backgroundColor: currentColors.background,
                    paddingBottom: 6
                }
            ]}
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
                    {t('threadDetail.replyUser')}
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
                                ref={inputRef}
                                multiline={true}
                                textAlignVertical="top"
                                autoFocus={true}
                                style={[
                                    styles.textInput,
                                    { color: currentColors.text }
                                ]}
                                placeholder={t('compose.addThread')}
                                placeholderTextColor={currentColors.gray}
                                onChangeText={value =>
                                    (inputRef.current.value = value)
                                }
                            />
                            {/* Action buttons */}
                            <View style={styles.action}>
                                <Pressable
                                    style={styles.actionButton}
                                    onPress={selectImageFromLibrary}
                                >
                                    <Ionicons
                                        name="images-outline"
                                        size={hp(2.2)}
                                        color={currentColors.gray}
                                    />
                                </Pressable>
                                <Pressable
                                    style={styles.actionButton}
                                    onPress={openCamera}
                                >
                                    <Ionicons
                                        name="camera-outline"
                                        size={hp(2.4)}
                                        color={currentColors.gray}
                                    />
                                </Pressable>
                            </View>
                            {/* Display selected images */}
                            <ImagePreview
                                images={selectedImages}
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

                {/* Dropdown menu */}
                {isDropdownVisible && (
                    <View
                        style={[
                            styles.dropdown,
                            {
                                backgroundColor: currentColors.background,
                                borderColor: currentColors.lightGray
                            }
                        ]}
                    >
                        {scopeOptions.map(option => (
                            <Pressable
                                key={option.value}
                                onPress={() => {
                                    setSelectedScope(option.value)
                                    setDropdownVisible(false)
                                }}
                                style={{
                                    padding: wp(3),
                                    borderColor: currentColors.extraLightGray,
                                    borderWidth: 0.5
                                }}
                            >
                                <Text style={{ color: currentColors.text }}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                )}

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
                        {loading ? t('compose.posting') : t('compose.submit')}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default NewThread

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingBottom: hp(2),
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
        paddingVertical: wp(2)
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
        paddingHorizontal: wp(2),
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
