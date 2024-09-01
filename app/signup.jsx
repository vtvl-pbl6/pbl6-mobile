import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import BackButton from '../components/BackButton'
import BaseButton from '../components/BaseButton'
import BaseInput from '../components/BaseInput'
import ScreenWapper from '../components/ScreenWapper'
import { icons } from '../constants/icons'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'

const SignUp = () => {
    const router = useRouter()
    const emailRef = useRef("")
    const usernameRef = useRef("")
    const passwordRef = useRef("")
    const confirmPasswordRef = useRef("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if(!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign Up', 'Please fill all the fields!')
            return
        }
    }

    return (
        <ScreenWapper bg="white">
            <StatusBar style='dark' />
            <View style={styles.container}>
                <BackButton router={router} />

                {/* welcome */}
                <View>
                    <Text style={styles.welcomeText}>Let's</Text>
                    <Text style={styles.welcomeText}>Get Started</Text>
                </View>

                {/* form */}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Please fill the details to create an account
                    </Text>
                    <BaseInput
                        icon={icons.user()}
                        placeholder='Enter your username'
                        onChangeText={value => usernameRef.current = value}
                    />
                    <BaseInput
                        icon={icons.mail()}
                        placeholder='Enter your email'
                        onChangeText={value => emailRef.current = value}
                    />
                    <BaseInput
                        icon={icons.lock()}
                        placeholder='Enter password'
                        secureTextEntry
                        onChangeText={value => passwordRef.current = value}
                    />
                    <BaseInput
                        icon={icons.lock()}
                        placeholder='Enter confirm password'
                        secureTextEntry
                        onChangeText={value => confirmPasswordRef.current = value}
                    />

                    {/* button */}
                    <BaseButton title='Sign up' loading={loading} onPress={onSubmit} />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account!
                    </Text>
                    <Pressable onPress={() => router.push('login')}>
                        <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWapper>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})