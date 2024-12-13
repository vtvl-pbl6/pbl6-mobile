import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import ModalDateTimePicker from 'react-native-modal-datetime-picker'
import { Divider } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import {
    BaseButton,
    BaseHeader,
    BaseModal,
    Loading,
    ScreenWapper
} from '../../components'
import theme from '../../constants/theme'
import { useTheme } from '../../contexts'
import userService from '../../services/userServices'
import { setUpdate, showToast } from '../../store/slices'
import { wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const EditProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t, i18n } = useTranslation()
    const handleError = useHandleError(navigation)
    const currentLanguage = i18n.language
    const insets = useSafeAreaInsets()

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [avatarUri, setAvatarUri] = useState(null)
    const [isUpdateModalVisible, setIsDeleteModalVisible] = useState(false)

    const [openGender, setOpenGender] = useState(false)
    const [valueGender, setValueGender] = useState(profile?.gender || 'OTHER')
    const [genderItems, setGenderItems] = useState([
        {
            label: t('updateProfile.genderSelection.male'),
            value: 'MALE'
        },
        {
            label: t('updateProfile.genderSelection.female'),
            value: 'FEMALE'
        },
        {
            label: t('updateProfile.genderSelection.other'),
            value: 'OTHER'
        }
    ])

    const [openVisibility, setOpenVisibility] = useState(false)
    const [valueVisibility, setValueVisibility] = useState(
        profile?.visibility || 'PUBLIC'
    )
    const [visibilityItems, setVisibilityItems] = useState([
        {
            label: t('updateProfile.scope.public'),
            value: 'PUBLIC'
        },
        {
            label: t('updateProfile.scope.private'),
            value: 'PRIVATE'
        },
        {
            label: t('updateProfile.scope.friend'),
            value: 'FRIEND_ONLY'
        }
    ])

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (loading) return
            setLoading(true)
            try {
                const response = await userService.getInfo()
                const { is_success, data } = response
                if (is_success && data) {
                    if (data.birthday) {
                        const dateParts = data.birthday.split(' ')[0].split('-')
                        const formattedBirthday = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                        data.birthday = formattedBirthday
                    }
                    setProfile(data)
                    setValueGender(data?.gender)
                }
            } catch (error) {
                handleError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchUserInfo()
    }, [])

    const handleInputChange = (field, value) => {
        if (profile) {
            setProfile({ ...profile, [field]: value })
        }
    }

    const handleSaveProfile = async () => {
        setLoading(true)
        try {
            if (profile) {
                const response = await userService.updateInfo(profile)
                if (response.is_success) {
                    dispatch(
                        showToast({
                            message: t('updateProfile.updateSuccessfully'),
                            type: 'success'
                        })
                    )
                }
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsDeleteModalVisible(false)
            dispatch(setUpdate(true))
            setLoading(false)
        }
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleDateConfirm = date => {
        setSelectedDate(date)
        const formattedDate = date.toISOString().split('T')[0]
        handleInputChange('birthday', formattedDate)
        hideDatePicker()
    }

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

    // Image picker function
    const pickAvatar = async () => {
        const permissionResult = await requestPermission()
        if (!permissionResult) return

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri
            await uploadAvatar(uri)
            setAvatarUri(uri)
            handleInputChange('avatar', uri)
        }
    }

    const uploadAvatar = async avatarUri => {
        if (loading) return
        setLoading(true)

        const formData = new FormData()
        const fileInfo = await FileSystem.getInfoAsync(avatarUri)
        formData.append('avatar', {
            name: fileInfo.uri.split('/').pop(),
            type: fileInfo.mimeType || 'image/jpeg',
            uri:
                Platform.OS === 'ios'
                    ? fileInfo.uri.replace('file://', '')
                    : fileInfo.uri
        })

        try {
            const response = await userService.updateAvatar(formData)

            if (response.is_success) {
                dispatch(
                    showToast({
                        message: t('updateProfile.updateSuccessfully'),
                        type: 'success'
                    })
                )
            }
        } catch (error) {
            handleError(error)
        } finally {
            dispatch(setUpdate(true))
            setLoading(false)
        }
    }

    if (loading || !profile) {
        return (
            <ScreenWapper styles={styles.container}>
                <Loading />
            </ScreenWapper>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{
                backgroundColor: currentColors.background,
                paddingTop: insets.top
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <BaseHeader
                title={t('updateProfile.title')}
                onBackPress={() => navigation.goBack()}
            />
            <Divider
                style={{
                    backgroundColor: currentColors.lightGray
                }}
            />
            <ScrollView>
                <View style={[styles.content]}>
                    {/* Avatar */}
                    <View>
                        {avatarUri ? (
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: avatarUri }}
                                    style={styles.avatarImage}
                                />
                            </View>
                        ) : profile?.avatar_file ? (
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{
                                        uri: profile.avatar_file.url
                                    }}
                                    style={styles.avatarImage}
                                />
                            </View>
                        ) : (
                            <Ionicons
                                name="person-circle-outline"
                                size={wp(30)}
                                color={currentColors.lightGray}
                            />
                        )}
                        <TouchableOpacity
                            onPress={pickAvatar}
                            style={[
                                styles.editButton,
                                {
                                    borderColor: currentColors.background
                                }
                            ]}
                        >
                            <Ionicons
                                name="pencil-outline"
                                size={wp(3.5)}
                                color={currentColors.background}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* First and Last Name */}
                    <View
                        style={[
                            styles.formGroup,
                            {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 10
                            }
                        ]}
                    >
                        <View style={{ width: wp(45) }}>
                            <Text
                                style={[
                                    styles.label,
                                    { color: currentColors.text }
                                ]}
                            >
                                {t('updateProfile.firstName')}
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: currentColors.text,
                                        borderColor: currentColors.lightGray
                                    }
                                ]}
                                placeholder={t('updateProfile.firstName')}
                                value={profile?.first_name || ''}
                                onChangeText={text =>
                                    handleInputChange('first_name', text)
                                }
                            />
                        </View>
                        <View style={{ width: wp(45) }}>
                            <Text
                                style={[
                                    styles.label,
                                    { color: currentColors.text }
                                ]}
                            >
                                {t('updateProfile.lastName')}
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: currentColors.text,
                                        borderColor: currentColors.lightGray
                                    }
                                ]}
                                placeholder={t('updateProfile.lastName')}
                                value={profile?.last_name || ''}
                                onChangeText={text =>
                                    handleInputChange('last_name', text)
                                }
                            />
                        </View>
                    </View>

                    {/* Birthday */}
                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('updateProfile.birthday')}
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color: currentColors.text,
                                    borderColor: currentColors.lightGray
                                }
                            ]}
                            placeholder={t('updateProfile.birthday')}
                            value={profile?.birthday || ''}
                            onPress={showDatePicker}
                            editable={false}
                        />
                        <ModalDateTimePicker
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                            date={selectedDate}
                            locale={currentLanguage || 'en'}
                            confirmTextIOS={t('modal.confirm')}
                            cancelTextIOS={t('modal.cancel')}
                        />
                    </View>

                    {/* Bio */}
                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('updateProfile.bio')}
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color: currentColors.text,
                                    borderColor: currentColors.lightGray
                                }
                            ]}
                            placeholder={t('updateProfile.bio')}
                            value={profile?.bio || ''}
                            onChangeText={text =>
                                handleInputChange('bio', text)
                            }
                        />
                    </View>

                    {/* Gender Picker */}
                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('updateProfile.gender')}
                        </Text>
                        <DropDownPicker
                            open={openGender}
                            value={valueGender}
                            setOpen={setOpenGender}
                            setValue={setValueGender}
                            onChangeValue={valueGender =>
                                handleInputChange('gender', valueGender)
                            }
                            items={genderItems}
                            dropDownDirection="TOP"
                            style={{
                                borderColor: currentColors.lightGray,
                                backgroundColor: currentColors.background,
                                borderWidth: 1,
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                marginTop: 4
                            }}
                            textStyle={{
                                color: currentColors.text
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: currentColors.extraLightGray,
                                borderColor: currentColors.lightGray
                            }}
                        />
                    </View>

                    {/* Visibility Picker */}
                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('updateProfile.visibility')}
                        </Text>
                        <DropDownPicker
                            open={openVisibility}
                            value={valueVisibility}
                            setOpen={setOpenVisibility}
                            setValue={setValueVisibility}
                            onChangeValue={value =>
                                handleInputChange('visibility', value)
                            }
                            items={visibilityItems}
                            style={{
                                borderColor: currentColors.lightGray,
                                backgroundColor: currentColors.background,
                                borderWidth: 1,
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                marginTop: 4
                            }}
                            textStyle={{
                                color: currentColors.text
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: currentColors.extraLightGray,
                                borderColor: currentColors.lightGray
                            }}
                        />
                    </View>

                    <BaseButton
                        buttonStyle={{ height: wp(12), width: wp(95) }}
                        textStyle={{ fontSize: wp(4) }}
                        title={t('updateProfile.save')}
                        onPress={() => {
                            setIsDeleteModalVisible(true)
                        }}
                    />
                </View>
            </ScrollView>
            {/* Modal confirm update */}
            <BaseModal
                visible={isUpdateModalVisible}
                title={t('action.updateProfileTitle')}
                message={t('action.updateProfileMessage')}
                onConfirm={handleSaveProfile}
                onCancel={() => {
                    setIsDeleteModalVisible(false)
                }}
            />
        </KeyboardAvoidingView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
    content: {
        paddingHorizontal: wp(4),
        width: wp(100),
        gap: wp(2),
        alignItems: 'center'
    },
    formGroup: {
        marginBottom: 12,
        width: wp(95)
    },
    label: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: theme.fonts.semibold
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 4
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: wp(4)
    },
    avatarImage: {
        width: wp(30),
        height: wp(30),
        borderRadius: wp(15)
    },
    editButton: {
        width: wp(8),
        height: wp(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: wp(2),
        right: wp(4),
        borderWidth: wp(1),
        backgroundColor: theme.colors.blue
    }
})
