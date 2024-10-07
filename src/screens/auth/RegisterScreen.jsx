import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BackButton, BaseButton, BaseInput, Loading } from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import authService from '../../services/authServices'
import { setLoading, showToast } from '../../store/slices'
import { getSafeAreaTop, hp, validateRegisterForm, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const loading = useSelector(state => state.loading)
    const handleError = useHandleError(navigation)

    const [formValues, setFormValues] = useState({
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value
        })
    }

    const onSubmit = async () => {
        const validationErrors = validateRegisterForm(formValues, t)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            dispatch(setLoading(true))
            try {
                const response = await authService.register(formValues)
                dispatch(
                    showToast({
                        message: t('register.registrationComplete'),
                        type: 'success'
                    })
                )
                navigation.navigate('Login')
            } catch (error) {
                handleError(error)
            } finally {
                dispatch(setLoading(false))
            }
        } else {
            dispatch(
                showToast({ message: t('register.fixErrors'), type: 'error' })
            )
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{
                    backgroundColor: currentColors.background,
                    paddingTop: getSafeAreaTop()
                }}
                showsVerticalScrollIndicator={false}
            >
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
                            {t('register.titleTop')}
                        </Text>
                        <Text
                            style={[
                                styles.welcomeText,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('register.titleBottom')}
                        </Text>
                    </View>

                    {/* form */}
                    <View style={styles.form}>
                        <Text
                            style={{
                                fontSize: hp(1.5),
                                color: currentColors.text
                            }}
                        >
                            {t('register.prompt')}
                        </Text>
                        <View style={styles.formGroup}>
                            <BaseInput
                                icon={
                                    <Ionicons
                                        name="person-outline"
                                        size={hp(2)}
                                        color={currentColors.gray}
                                    />
                                }
                                placeholder={t('register.usernamePlaceholder')}
                                onChangeText={value =>
                                    handleInputChange('username', value)
                                }
                                value={formValues.username}
                            />
                            {errors.username && (
                                <Text style={{ color: theme.colors.rose }}>
                                    {errors.username}
                                </Text>
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <BaseInput
                                icon={
                                    <Ionicons
                                        name="mail-outline"
                                        size={hp(2)}
                                        color={currentColors.gray}
                                    />
                                }
                                placeholder={t('register.emailPlaceholder')}
                                onChangeText={value =>
                                    handleInputChange('email', value)
                                }
                                value={formValues.email}
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
                                placeholder={t('register.passwordPlaceholder')}
                                secureTextEntry
                                onChangeText={value =>
                                    handleInputChange('password', value)
                                }
                                value={formValues.password}
                            />
                            {errors.password && (
                                <Text style={{ color: theme.colors.rose }}>
                                    {errors.password}
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
                                placeholder={t(
                                    'register.confirmPasswordPlaceholder'
                                )}
                                secureTextEntry
                                onChangeText={value =>
                                    handleInputChange('confirm_password', value)
                                }
                                value={formValues.confirm_password}
                            />
                            {errors.confirm_password && (
                                <Text style={{ color: theme.colors.rose }}>
                                    {errors.confirm_password}
                                </Text>
                            )}
                        </View>

                        {/* button */}
                        {loading ? (
                            <Loading />
                        ) : (
                            <BaseButton
                                title={t('register.signUp')}
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
                            {t('register.loginTitle')}
                        </Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text
                                style={[
                                    styles.footerText,
                                    {
                                        color: currentColors.text,
                                        fontWeight: theme.fonts.semibold
                                    }
                                ]}
                            >
                                {t('register.login')}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 30,
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
        gap: 6
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
