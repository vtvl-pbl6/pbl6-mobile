import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { useTheme } from '../../contexts'
import { setLanguage } from '../../store/slices'
import { wp } from '../../utils'

const LanguageToggle = () => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t, i18n } = useTranslation()

    const language = useSelector(state => state.language.language)

    const handlePress = lng => {
        dispatch(setLanguage(lng))
        i18n.changeLanguage(lng)
    }

    return (
        <View style={[styles.container]}>
            <Pressable
                style={[
                    styles.segment,
                    { borderColor: currentColors.lightGray, borderWidth: 0.5 },
                    language === 'en' && { borderColor: currentColors.text }
                ]}
                onPress={() => handlePress('en')}
            >
                <Text style={{ fontSize: wp(9) }}>🇺🇸</Text>
                <Text
                    style={[
                        styles.text,
                        language === 'en'
                            ? {
                                  color: currentColors.text,
                                  fontWeight: theme.fonts.bold
                              }
                            : { color: currentColors.gray }
                    ]}
                >
                    {t('setting.language.english')}
                </Text>
            </Pressable>

            <Pressable
                style={[
                    styles.segment,
                    { borderColor: currentColors.lightGray, borderWidth: 0.5 },
                    language === 'vi' && { borderColor: currentColors.text }
                ]}
                onPress={() => handlePress('vi')}
            >
                <Text style={{ fontSize: wp(9) }}>🇻🇳</Text>
                <Text
                    style={[
                        styles.text,
                        language === 'vi'
                            ? {
                                  color: currentColors.text,
                                  fontWeight: theme.fonts.bold
                              }
                            : { color: currentColors.gray }
                    ]}
                >
                    {t('setting.language.vietnamese')}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.md,
        gap: 10
        // width: wp(50),
    },
    segment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp(5),
        borderRadius: theme.radius.md,
        borderWidth: 0.5
    },
    text: {
        marginTop: wp(2),
        fontSize: wp(4)
    }
})

export default LanguageToggle
