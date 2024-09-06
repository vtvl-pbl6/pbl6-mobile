import React, { useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import BaseModal from '../../components/BaseModal'
import BaseToast from '../../components/BaseToast'
import ScreenWapper from '../../components/ScreenWapper'

const Profile = () => {
    const [isConfirmVisible, setConfirmVisible] = useState(false)
    const [isToastVisible, setToastVisible] = useState(false)

    return (
        <ScreenWapper>
            <Button title="Show Confirm" onPress={() => setConfirmVisible(true)} />
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
            <Button title="Show Toast" onPress={() => setToastVisible(true)}></Button>
            <BaseToast 
                visible={isToastVisible}
                message="Registered successfully!"
                onHide={() => setToastVisible(false)}
            />
        </ScreenWapper>
    )
}

export default Profile

const styles = StyleSheet.create({})