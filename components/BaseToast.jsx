import React, { useEffect, useRef } from 'react'
import { Animated, Modal, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../constants/theme'
import { wp } from '../helpers/common'

const BaseToast = ({ visible, message, onHide }) => {
    const top = useSafeAreaInsets()
    const marginTop = top > 0 ? top + 15 : 60

    const translateY = useRef(new Animated.Value(-100)).current

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: marginTop,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    onHide()
                })
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [visible]);

    return (
        <Modal transparent={true} visible={visible} animationType="none">
            <View style={styles.container}>
                <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
                    <Text style={styles.message}>{message}</Text>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default BaseToast;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    content: {
        backgroundColor: theme.colors.grayDark,
        paddingHorizontal: wp(5),
        paddingVertical: wp(4.6),
        borderRadius: 50,
        flexDirection: 'row',
    },
    message: {
        color: 'white',
        fontSize: wp(3.6),
    }
})
