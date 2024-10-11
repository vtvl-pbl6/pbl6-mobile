import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useLanguage, useTheme } from '../../contexts'
import { hp, wp } from '../../utils'

const BaseHeader = ({ title, onBackPress }) => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    return (
        <View
            style={[
                styles.headerContainer,
                { backgroundColor: currentColors.background }
            ]}
        >
            <Pressable onPress={onBackPress} style={styles.backButton}>
                <Ionicons
                    name="arrow-back"
                    size={wp(7)}
                    color={currentColors.text}
                />
            </Pressable>
            <Text style={[styles.headerTitle, { color: currentColors.text }]}>
                {title || t('header.defaultTitle')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    backButton: {
        padding: wp(2),
        position: 'absolute',
        left: wp(2)
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default BaseHeader
