import LottieView from 'lottie-react-native'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useLanguage, useTheme } from '../contexts'
import { hp, wp } from '../utils'

const Footer = ({ loading = false, hasMore = false, label = '' }) => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    if (loading) {
        return (
            <ActivityIndicator
                size="small"
                color={currentColors.text}
                style={{ paddingVertical: 30 }}
            />
        )
    }

    if (!hasMore) {
        const animationSource =
            currentColors.background === '#FFFFFF'
                ? require('../../assets/animations/notFoundLight.json')
                : require('../../assets/animations/notFoundDark.json')

        return (
            <View style={styles.container}>
                <LottieView
                    source={animationSource}
                    autoPlay
                    loop
                    enableMergePathsAndroidForKitKatAndAbove={true}
                    style={styles.animation}
                />
                <Text
                    style={[styles.noMoreText, { color: currentColors.text }]}
                >
                    {label}
                </Text>
            </View>
        )
    }

    return null
}

export default Footer

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noMoreText: {
        textAlign: 'center',
        padding: 16
    },
    animation: {
        width: wp(100),
        height: hp(20),
        alignSelf: 'center'
    }
})
