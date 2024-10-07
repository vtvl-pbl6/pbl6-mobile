import React from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'

const ProfileSearchLoader = ({ prop }) => {
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <ContentLoader
                viewBox="0 0 380 70"
                width={'100%'}
                height={100}
                speed={2}
            >
                <Rect x="100" y="17" rx="4" ry="4" width="270" height="15" />
                <Rect x="100" y="40" rx="3" ry="3" width="220" height="15" />
                <Circle cx="46" cy="35" r="34" />
            </ContentLoader>
        </View>
    )
}

export default ProfileSearchLoader

const styles = StyleSheet.create({})
