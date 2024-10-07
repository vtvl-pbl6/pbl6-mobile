import React from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'

const ProfileInfoLoader = ({ prop }) => {
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ContentLoader
                viewBox="0 0 380 70"
                width={'100%'}
                height={200}
                speed={2}
            >
                <Rect x="10" y="17" rx="4" ry="4" width="270" height="15" />
                <Rect x="10" y="40" rx="3" ry="3" width="220" height="10" />
                <Circle cx="335" cy="35" r="35" />
            </ContentLoader>
        </View>
    )
}

export default ProfileInfoLoader

const styles = StyleSheet.create({})
