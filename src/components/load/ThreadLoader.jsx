import React from 'react'
import ContentLoader from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'

const ProfileInfoLoader = ({ prop }) => {
    return (
        <View style={{ padding: 10 }}>
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
        </View>
    )
}

export default ProfileInfoLoader

const styles = StyleSheet.create({})
