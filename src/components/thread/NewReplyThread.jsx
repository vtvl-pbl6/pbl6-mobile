import React, { useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useDispatch } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { hp, wp } from '../../utils'
import NewThread from './NewThread'

const NewReplyThread = ({ thread }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const refRBSheet = useRef()
    const inputRef = useRef()
    const [inputValue, setInputValue] = useState('')

    const openBottomSheet = () => {
        refRBSheet.current.open()
    }

    const closeBottomSheet = () => {
        refRBSheet.current.close()
    }

    return (
        <View style={styles.container}>
            {/* Button open Bottom Sheet */}
            <Pressable
                style={[
                    styles.button,
                    { backgroundColor: currentColors.extraLightGray }
                ]}
                onPress={openBottomSheet}
            >
                <Text
                    style={[styles.buttonText, { color: currentColors.gray }]}
                >
                    {t('threadDetail.replyUser') +
                        ' ' +
                        thread?.author.display_name +
                        '...'}
                </Text>
            </Pressable>

            {/* Bottom Sheet */}
            <RBSheet
                ref={refRBSheet}
                height={hp(56)}
                openDuration={150}
                draggable={true}
                onOpen={() => {
                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                    }, 150)
                }}
                customStyles={{
                    container: {
                        backgroundColor: currentColors.background,
                        borderTopLeftRadius: theme.radius.xxl,
                        borderTopRightRadius: theme.radius.xxl
                    },
                    draggableIcon: {
                        backgroundColor: currentColors.background
                    }
                }}
            >
                <NewThread threadId={thread?.id} onClose={closeBottomSheet} />
            </RBSheet>
        </View>
    )
}

export default NewReplyThread

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: wp(96),
        flexDirection: 'row',
        padding: wp(4),
        borderRadius: 50
    },
    buttonText: {
        fontSize: wp(3.6)
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20
    }
})
