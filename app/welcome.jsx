import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import ScreenWapper from '../components/ScreenWapper'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'

const Welcome = () => {
    const router = useRouter()
    return (
        <ScreenWapper bg="white">
            <StatusBar style="dark"/>
            <View style={styles.container}>
                { /* welcome image */ }
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/ui/welcome.png')} />

                {/* title */}
                <View style={{gap: 20}}>
                    <Text style={styles.title}>LinkUp!</Text>
                    <Text style={styles.punchline}>
                        When Life Gives You Lemons, We Squeeze Out the Hate.
                        </Text>
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <BaseButton
                        title='Getting Started'
                        buttonStyle={{marginHorizontal: wp(3)}}
                        onPress={() => router.push('signUp')}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>
                            Already have an account!
                        </Text>
                        <Pressable onPress={() => router.push('login')}>
                            <Text style={[styles.loginText, {color: theme.colors.primary, fontWeight: theme.fonts.semibold}]}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4),
    },
    welcomeImage: {
        width: wp(100),
        height: hp(40),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(8),
        fontSize: hp(1.7),
        color: theme.colors.text,
    },
    footer: {
        gap: 30,
        width: '100%'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})