import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { icons } from '../constants/icons'
import { theme } from '../constants/theme'

const BackButton = ({size=26, router}) => {
    return (
        <Pressable onPress={() => router.back()} style={styles.button}>
            <View>
                {icons.arrowLeft()}
            </View>

        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0,0,0,0.07)'
    }
})