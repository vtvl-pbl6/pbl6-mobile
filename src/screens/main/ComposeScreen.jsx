import React from 'react'
import { StyleSheet, View } from 'react-native'
import Loading from '../../components/Loading'

const ComposeScreen = () => {
    return (
        <View>
            <Loading
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            />
        </View>
    )
}

export default ComposeScreen

const styles = StyleSheet.create({})
