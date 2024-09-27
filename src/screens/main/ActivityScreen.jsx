import React, { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BaseModal, ScreenWapper } from '../../components'
import { useLanguage, useTheme } from '../../contexts'
import { showToast } from '../../store/slices'

const ActivityScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const [isConfirmVisible, setConfirmVisible] = useState(false)

    const handleShowToast = () => {
        const message = 'Cảnh báo!'
        dispatch(showToast({ message, type: 'info' }))
    }

    const language = useSelector(state => state.language.language)

    return (
        <ScreenWapper styles={{ backgroundColor: currentColors.background }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button title="Hiện thông báo" onPress={handleShowToast} />
                <Button
                    title="Show Confirm"
                    onPress={() => setConfirmVisible(true)}
                />
                <Button
                    title="Edit profile"
                    onPress={() =>
                        navigation.navigate('Profile', {
                            screen: 'EditProfile'
                        })
                    }
                />
            </View>
            <BaseModal
                visible={isConfirmVisible}
                type="warning"
                title="Delete article"
                message="Are you sure want to delete this article? This action cannot be undone."
                onConfirm={() => {
                    setConfirmVisible(false)
                    // handle confirm action
                }}
                onCancel={() => setConfirmVisible(false)}
            />
        </ScreenWapper>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({})
