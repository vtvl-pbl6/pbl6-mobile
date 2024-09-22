import LottieView from 'lottie-react-native'
import { React } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../components/base/BaseButton'
import ScreenWapper from '../../components/ScreenWapper'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'

const WelcomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <View style={styles.container}>
                {/* welcome animation */}
                <LottieView
                    source={require('../../../assets/animations/social.json')}
                    autoPlay
                    loop
                    enableMergePathsAndroidForKitKatAndAbove={true}
                    style={[styles.animation]}
                />

                {/* title */}
                <View style={{ gap: 10 }}>
                    <Text style={[styles.title, { color: currentColors.text }]}>
                        {t('welcome.title')}
                    </Text>
                    <Text
                        style={[
                            styles.punchline,
                            { color: currentColors.text }
                        ]}
                    >
                        {t('welcome.punchline')}
                    </Text>
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <BaseButton
                        title={t('welcome.buttonTitle')}
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => navigation.navigate('Register')}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text
                            style={[
                                styles.loginText,
                                { color: currentColors.text }
                            ]}
                        >
                            {t('welcome.loginTitle')}
                        </Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text
                                style={[
                                    styles.loginText,
                                    {
                                        color: currentColors.text,
                                        fontWeight: theme.fonts.semibold
                                    }
                                ]}
                            >
                                {t('welcome.login')}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWapper>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: wp(4)
    },
    animation: {
        width: wp(100),
        height: hp(40),
        alignSelf: 'center'
    },
    title: {
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(4),
        fontSize: hp(1.7)
    },
    footer: {
        gap: 20,
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
        fontSize: hp(1.6)
    }
})
