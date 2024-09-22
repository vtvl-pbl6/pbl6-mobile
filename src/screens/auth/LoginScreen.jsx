import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackButton from '../../components/BackButton'
import BaseButton from '../../components/base/BaseButton'
import BaseInput from '../../components/base/BaseInput'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import { login } from '../../store/slices/authSlice'
import { showToast } from '../../store/slices/toastSlice'
import { hp, wp } from '../../utils/dimensionUtils'

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [loading, setLoading] = useState(false)
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

    const onSubmit = () => {
        const validationErrors = validateLoginForm()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            dispatch(login())
            dispatch(
                showToast({ message: t('login.success'), type: 'success' })
            )
            setLoading(false)
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

                    {/* button */}
                    <BaseButton
                        title={t('login.loginButton')}
                        loading={loading}
                        onPress={onSubmit}
                    />
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
