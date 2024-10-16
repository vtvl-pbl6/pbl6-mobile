import React from 'react'
import ContentLoader from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'

const NotificationLoader = ({ prop }) => {
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <ContentLoader height={140} speed={1} viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
        </View>
    )
}

export default NotificationLoader

const styles = StyleSheet.create({})
