// [ TEST CODE ]

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ScreenWapper } from '../../components'
import ChatRoom from '../../components/testSocket/ChatRoom'
import { useLanguage, useTheme } from '../../contexts'

const ActivityScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const language = useSelector(state => state.language.language)

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            ></View>
            <ChatRoom />
        </ScreenWapper>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({})
