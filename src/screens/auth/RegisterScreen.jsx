import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackButton from '../../components/BackButton'
import BaseButton from '../../components/base/BaseButton'
import BaseInput from '../../components/base/BaseInput'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import { showToast } from '../../store/slices/toastSlice'
import { hp, wp } from '../../utils/dimensionUtils'
import { validateRegisterForm } from '../../utils/validationUtils'

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const [formValues, setFormValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const onSubmit = () => {
        const validationErrors = validateRegisterForm(formValues, t)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            dispatch(
                showToast({
                    message: t('register.registrationComplete'),
                    type: 'success'
                })
            )
            // navigation.navigate('Login')
        } else {
            dispatch(
                showToast({ message: t('register.fixErrors'), type: 'error' })
            )
        }
    }

    const handleInputChange = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value
        })
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
                        style={{ fontSize: hp(1.5), color: currentColors.text }}
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
                                handleInputChange('confirmPassword', value)
                            }
                            value={formValues.confirmPassword}
                        />
                        {errors.confirmPassword && (
                            <Text style={{ color: theme.colors.rose }}>
                                {errors.confirmPassword}
                            </Text>
                        )}
                    </View>

                    {/* button */}
                    <BaseButton
                        title={t('register.signUp')}
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
        </ScreenWapper>
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
