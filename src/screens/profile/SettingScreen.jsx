import { Ionicons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useDispatch } from 'react-redux'
import {
    BaseHeader,
    LanguageToggle,
    ModeToggle,
    ScreenWapper
} from '../../components'
import theme from '../../constants/theme'
import { useTheme } from '../../contexts'
import authService from '../../services/authServices'
import { logout } from '../../store/slices'
import { clearAllThreads } from '../../store/slices/threadSlice'
import { hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const SettingScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useTranslation()

    const refInfoSheet = useRef()
    const refLanguageSheet = useRef()
    const refThemeSheet = useRef()

    const handleLogout = async () => {
        try {
            const response = await authService.logout()
        } catch (error) {
            useHandleError(error)
        } finally {
            dispatch(logout())
            dispatch(clearAllThreads())
        }
    }

    const handleShowInformation = () => {}

    return (
        <ScreenWapper style={styles.functions}>
            <BaseHeader
                title={t('setting.header')}
                onBackPress={() => navigation.goBack()}
            />
            <Divider style={{ backgroundColor: currentColors.lightGray }} />

            {/* Change language */}
            <Pressable
                style={styles.actionButton}
                onPress={() => refLanguageSheet.current.open()}
            >
                <Ionicons
                    name="language-outline"
                    size={wp(6)}
                    style={[styles.icon, { color: currentColors.text }]}
                />
                <Text
                    style={[styles.actionText, { color: currentColors.text }]}
                >
                    {t('setting.changeLanguage')}
                </Text>
            </Pressable>

            {/* Change mode */}
            <Pressable
                style={styles.actionButton}
                onPress={() => refThemeSheet.current.open()}
            >
                <Ionicons
                    name="invert-mode-outline"
                    size={wp(6)}
                    style={[styles.icon, { color: currentColors.text }]}
                />
                <Text
                    style={[styles.actionText, { color: currentColors.text }]}
                >
                    {t('setting.changeMode')}
                </Text>
            </Pressable>

            {/* Change password */}
            <Pressable
                style={styles.actionButton}
                onPress={() => {
                    navigation.navigate('Profile', {
                        screen: 'ChangePassword'
                    })
                }}
            >
                <Ionicons
                    name="lock-closed-outline"
                    size={wp(6)}
                    style={[styles.icon, { color: currentColors.text }]}
                />
                <Text
                    style={[styles.actionText, { color: currentColors.text }]}
                >
                    {t('setting.changePassword')}
                </Text>
            </Pressable>

            {/* Information */}
            <Pressable
                style={styles.actionButton}
                onPress={handleShowInformation}
            >
                <Ionicons
                    name="information-circle-outline"
                    size={wp(6)}
                    style={[styles.icon, { color: currentColors.text }]}
                />
                <Text
                    style={[styles.actionText, { color: currentColors.text }]}
                >
                    {t('setting.aboutUs')}
                </Text>
            </Pressable>

            <Divider style={{ backgroundColor: currentColors.lightGray }} />

            {/* Logout */}
            <Pressable style={styles.actionButton} onPress={handleLogout}>
                <Text style={styles.logout}>{t('setting.logout')}</Text>
            </Pressable>

            {/* Sheet language */}
            <RBSheet
                customStyles={{
                    container: [
                        styles.container,
                        { backgroundColor: currentColors.background }
                    ],
                    draggableIcon: {
                        backgroundColor: currentColors.gray,
                        width: wp(16)
                    }
                }}
                height={hp(40)}
                openDuration={250}
                ref={refLanguageSheet}
                draggable={true}
            >
                <View
                    style={[
                        styles.contentContainer,
                        { backgroundColor: currentColors.background }
                    ]}
                >
                    <Text
                        style={{
                            color: currentColors.text,
                            fontSize: wp(4.6),
                            fontWeight: theme.fonts.bold
                        }}
                    >
                        {t('setting.language.title')}
                    </Text>
                    <LanguageToggle />
                </View>
            </RBSheet>

            {/* Sheet theme */}
            <RBSheet
                customStyles={{
                    container: [
                        styles.container,
                        { backgroundColor: currentColors.background }
                    ],
                    draggableIcon: {
                        backgroundColor: currentColors.gray,
                        width: wp(16)
                    }
                }}
                height={hp(30)}
                openDuration={250}
                ref={refThemeSheet}
                draggable={true}
            >
                <View
                    style={[
                        styles.contentContainer,
                        { backgroundColor: currentColors.background }
                    ]}
                >
                    <Text
                        style={{
                            color: currentColors.text,
                            fontSize: wp(4.6),
                            fontWeight: theme.fonts.bold
                        }}
                    >
                        {t('setting.selectMode')}
                    </Text>
                    <ModeToggle />
                </View>
            </RBSheet>
        </ScreenWapper>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    actionButton: {
        paddingHorizontal: wp(5),
        paddingVertical: wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    icon: {},
    actionText: {
        fontSize: wp(4)
    },
    logout: {
        fontSize: wp(4),
        color: theme.colors.rose
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: wp(4),
        gap: 40
    },
    container: {
        borderTopLeftRadius: theme.radius.xxl,
        borderTopRightRadius: theme.radius.xxl
    }
})
