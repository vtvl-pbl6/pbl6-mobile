import React from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import images from '../constants/images'
import { theme } from '../constants/theme'
import { wp } from '../helpers/common'

const BaseModal = ({ visible, type, title, message, onConfirm, onCancel }) => {

    const renderIcon = () => {
        switch (type) {
            case 'warning':
                return <Image source={images.lemonScare} style={styles.image} />
            case 'confirm':
                return <Image source={images.lemonSad} style={styles.image} />
            default:
                return <Image source={images.lemonWink} style={styles.image} />
        }
    }

    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {renderIcon()}
                    {title && <Text style={styles.title}>{title}</Text>}
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonContainer}>
                            <Pressable style={[styles.button, {backgroundColor: theme.colors.rose}]} onPress={onCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={[styles.button, {backgroundColor: theme.colors.green}]} onPress={onConfirm}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default BaseModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: wp(80),
        padding: wp(6),
        backgroundColor: 'white',
        borderRadius: theme.radius.xl,
        alignItems: 'center',
    },
    image: {
        width: wp(12),
        height: wp(12),
        marginBottom: wp(4),
    },
    title: {
        fontSize: wp(5),
        color: theme.colors.text,
        fontWeight: 'bold',
        marginBottom: wp(2),
        textAlign: 'center',
    },
    message: {
        fontSize: wp(3.8),
        color: theme.colors.text,
        marginBottom: wp(6),
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: wp(3),
        borderRadius: theme.radius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(2),
        backgroundColor: theme.colors.primary,
        shadow: theme.colors.dark,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    },
    confirmButton: {
        backgroundColor: theme.colors.green,
    },
    buttonText: {
        color: 'white',
        fontSize: wp(3.5),
        fontWeight: 'bold',
    },
})
