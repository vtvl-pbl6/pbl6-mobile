import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { BaseButton, BaseHeader, Loading, ScreenWapper } from '../../components'
import theme from '../../constants/theme'
import { useTheme } from '../../contexts'
import authService from '../../services/authServices'
import { showToast } from '../../store/slices'
import { validatePassword, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const ChangePassword = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useTranslation()

    const handleError = useHandleError(navigation)
    const user = useSelector(state => state.user.user)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validateForm = () => {
        const values = { oldPassword, newPassword, confirmPassword }
        const validationErrors = validatePassword(values, t)
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0
    }

    const handlePasswordUpdate = async () => {
        if (!validateForm() || loading) return
        setLoading(true)

        try {
            const response = await authService.changePassword({
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            })
            if (response.is_success) {
                navigation.goBack()
                dispatch(
                    showToast({
                        message: t('changePassword.success'),
                        type: 'success'
                    })
                )
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScreenWapper style={styles.functions}>
            <BaseHeader
                title={t('changePassword.header')}
                onBackPress={() => navigation.goBack()}
            />
            <Divider style={{ backgroundColor: currentColors.lightGray }} />
            <View style={{ alignItems: 'center' }}>
                <View style={{ marginTop: wp(4) }}>
                    {user?.avatar_file ? (
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{
                                    uri: user.avatar_file.url
                                }}
                                style={styles.avatarImage}
                            />
                        </View>
                    ) : (
                        <Ionicons
                            name="person-circle-outline"
                            size={wp(26)}
                            color={currentColors.lightGray}
                        />
                    )}
                </View>
                <View style={[styles.content]}>
                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('changePassword.oldPassword')}
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: currentColors.lightGray }
                            ]}
                            placeholder={t('changePassword.oldPassword')}
                            secureTextEntry
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        {errors.oldPassword && (
                            <Text style={styles.errorText}>
                                {errors.oldPassword}
                            </Text>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('changePassword.newPassword')}
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: currentColors.lightGray }
                            ]}
                            placeholder={t('changePassword.newPassword')}
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        {errors.newPassword && (
                            <Text style={styles.errorText}>
                                {errors.newPassword}
                            </Text>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('changePassword.confirmPassword')}
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: currentColors.lightGray }
                            ]}
                            placeholder={t('changePassword.confirmPassword')}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>
                                {errors.confirmPassword}
                            </Text>
                        )}
                    </View>

                    {loading ? (
                        <Loading />
                    ) : (
                        <BaseButton
                            buttonStyle={{ height: wp(12), width: wp(95) }}
                            textStyle={{ fontSize: wp(4) }}
                            title={t('changePassword.updateButton')}
                            onPress={handlePasswordUpdate}
                        />
                    )}
                </View>
            </View>
        </ScreenWapper>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: wp(4)
    },
    avatarImage: {
        width: wp(28),
        height: wp(28),
        borderRadius: wp(15)
    },
    content: {
        paddingTop: wp(4),
        width: wp(100),
        gap: wp(3),
        alignItems: 'center'
    },
    functions: {
        padding: 16
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
        height: 42,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 4
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4
    }
})
