import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackButton from '../../components/BackButton'
import BaseButton from '../../components/base/BaseButton'
import BaseInput from '../../components/base/BaseInput'
import Loading from '../../components/Loading'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import authService from '../../services/authServices'
import { login } from '../../store/slices/authSlice'
import { setLoading } from '../../store/slices/loadingSlice'
import { showToast } from '../../store/slices/toastSlice'
import { hp, wp } from '../../utils/dimensionUtils'
import useHandleError from '../../utils/handlers/errorHandler'
import { saveTokensToStorage } from '../../utils/storageUtils'

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const loading = useSelector(state => state.loading)
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode
    const handleError = useHandleError(navigation)

    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [errors, setErrors] = useState({})

    const validateLoginForm = () => {
        const errors = {}
        if (!emailRef.current) {
            errors.email = t('validation.emailRequired')
        }
        if (!passwordRef.current) {
            errors.password = t('validation.passwordRequired')
        }
        return errors
    }

    const onSubmit = async () => {
        const validationErrors = validateLoginForm()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            dispatch(setLoading(true))
            try {
                const response = await authService.login({
                    email: emailRef.current,
                    password: passwordRef.current
                })
                const { access_token, refresh_token } = response.data
                await saveTokensToStorage({
                    accessToken: access_token,
                    refreshToken: refresh_token
                })
                dispatch(login())

                dispatch(
                    showToast({ message: t('login.success'), type: 'success' })
                )

                // const tokens = await getTokensFromStorage()
                // console.log("TOKENS: ", tokens)

                // Thực hiện chuyển hướng hoặc xử lý logic khác ở đây
            } catch (error) {
                handleError(error)
            } finally {
                dispatch(setLoading(false))
            }
        } else {
            dispatch(
                showToast({ message: t('login.fixErrors'), type: 'error' })
            )
        }
    }

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <View style={styles.container}>
                <BackButton />

                {/* welcome */}
                <View>
                    <Text
                        style={[
                            styles.welcomeText,
                            { color: currentColors.text }
                        ]}
                    >
                        {t('login.welcomeBack')}
                    </Text>
                </View>

                {/* form */}
                <View style={styles.form}>
                    <Text
                        style={{ fontSize: hp(1.5), color: currentColors.text }}
                    >
                        {t('login.loginPrompt')}
                    </Text>

                    <View style={styles.formGroup}>
                        <BaseInput
                            icon={
                                <Ionicons
                                    name="mail-outline"
                                    size={hp(2)}
                                    color={currentColors.gray}
                                />
                            }
                            placeholder={t('login.emailPlaceholder')}
                            onChangeText={value => (emailRef.current = value)}
                        />
                        {errors.email && (
                            <Text style={{ color: theme.colors.rose }}>
                                {errors.email}
                            </Text>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <BaseInput
                            icon={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={hp(2)}
                                    color={currentColors.gray}
                                />
                            }
                            placeholder={t('login.passwordPlaceholder')}
                            secureTextEntry
                            onChangeText={value =>
                                (passwordRef.current = value)
                            }
                        />
                        {errors.password && (
                            <Text style={{ color: theme.colors.rose }}>
                                {errors.password}
                            </Text>
                        )}
                    </View>

                    <Text
                        style={[
                            styles.forgotPassword,
                            { color: currentColors.text }
                        ]}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        {t('login.forgotPassword')}
                    </Text>

                    {/* Show button or loading based on state */}
                    {loading ? (
                        <Loading />
                    ) : (
                        <BaseButton
                            title={t('login.loginButton')}
                            loading={loading}
                            onPress={onSubmit}
                        />
                    )}
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text
                        style={[
                            styles.footerText,
                            { color: currentColors.text }
                        ]}
                    >
                        {t('login.noAccount')}
                    </Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text
                            style={[
                                styles.footerText,
                                {
                                    color: currentColors.text,
                                    fontWeight: theme.fonts.semibold
                                }
                            ]}
                        >
                            {t('login.signUp')}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWapper>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold
    },
    form: {
        gap: 25
    },
    formGroup: {
        gap: 5
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        textAlign: 'center',
        fontSize: hp(1.6)
    }
})
