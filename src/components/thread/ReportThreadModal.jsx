import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { wp } from '../../utils/dimensionUtils'

const ReportThreadModal = ({ visible, title, onConfirm, onCancel }) => {
    const [reason, setReason] = useState('')
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode
    const { t } = useTranslation()

    const handleConfirm = () => {
        const data = { reason: reason || t('reportModal.defaultReason') }
        onConfirm(data)
        setReason('')
    }

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
                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: currentColors.lightGray,
                                color: currentColors.text
                            }
                        ]}
                        placeholder={t('reportModal.placeholder')}
                        placeholderTextColor={currentColors.placeholder}
                        value={reason}
                        onChangeText={setReason}
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[
                                styles.button,
                                {
                                    backgroundColor: theme.colors.rose,
                                    marginRight: 2
                                }
                            ]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.buttonText}>
                                {t('modal.confirm')}
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.button,
                                {
                                    backgroundColor: currentColors.text,
                                    marginLeft: 2
                                }
                            ]}
                            onPress={() => {
                                onCancel()
                                setReason('')
                            }}
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
        </Modal>
    )
}

export default ReportThreadModal

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
    title: {
        fontSize: wp(4.6),
        fontWeight: theme.fonts.bold,
        marginTop: wp(3),
        marginBottom: wp(2),
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: wp(11),
        borderWidth: 1,
        borderRadius: theme.radius.sm,
        paddingHorizontal: wp(3),
        marginVertical: wp(4),
        fontSize: wp(3.8)
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
        alignItems: 'center'
    },
    buttonText: {
        fontSize: wp(3.5),
        fontWeight: 'bold',
        color: 'white'
    }
})
