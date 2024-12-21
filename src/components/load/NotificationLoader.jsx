import React from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'

const NotificationLoader = ({ prop }) => {
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <ContentLoader
                viewBox="0 0 380 70"
                width={'100%'}
                height={100}
                speed={2}
            >
                <Rect x="90" y="17" rx="4" ry="4" width="160" height="14" />
                <Rect x="90" y="40" rx="3" ry="3" width="270" height="10" />
                <Rect x="90" y="54" rx="3" ry="3" width="270" height="10" />
                <Circle cx="40" cy="35" r="30" />
            </ContentLoader>
        </View>
    )
}

export default NotificationLoader

const styles = StyleSheet.create({})
