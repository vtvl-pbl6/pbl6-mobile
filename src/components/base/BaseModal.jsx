import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { wp } from '../../utils/dimensionUtils'

const BaseModal = ({ visible, type, title, message, onConfirm, onCancel }) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode
    const { t, i18n } = useTranslation()

    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContainer,
                        { backgroundColor: currentColors.background }
                    ]}
                >
                    {title && (
                        <Text
                            style={[
                                styles.title,
                                { color: currentColors.text }
                            ]}
                        >
                            {title}
                        </Text>
                    )}
                    <Text
                        style={[styles.message, { color: currentColors.text }]}
                    >
                        {message}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: theme.colors.rose,
                                        borderColor: theme.colors.rose,
                                        borderWidth: 0.5
                                    }
                                ]}
                                onPress={onConfirm}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        { color: 'white' }
                                    ]}
                                >
                                    {t('modal.confirm')}
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: currentColors.text,
                                        borderColor: currentColors.text,
                                        borderWidth: 0.5
                                    }
                                ]}
                                onPress={onCancel}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        { color: currentColors.background }
                                    ]}
                                >
                                    {t('modal.cancel')}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default BaseModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalContainer: {
        width: wp(80),
        padding: wp(6),
        borderRadius: theme.radius.xl,
        alignItems: 'center'
    },
    image: {
        width: wp(12),
        height: wp(12),
        marginBottom: wp(4)
    },
    title: {
        fontSize: wp(5),
        fontWeight: 'bold',
        marginBottom: wp(2),
        textAlign: 'center'
    },
    message: {
        fontSize: wp(3.8),
        marginBottom: wp(6),
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        flex: 1,
        paddingVertical: wp(3),
        borderRadius: theme.radius.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(2)
    },
    confirmButton: {
        backgroundColor: theme.colors.green
    },
    buttonText: {
        fontSize: wp(3.5),
        fontWeight: 'bold'
    }
})
