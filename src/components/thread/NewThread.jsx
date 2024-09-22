import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../constants/theme'
import { hp, wp } from '../../utils/dimensionUtils'

export default function NewThread() {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    // Lấy trạng thái từ Redux store
    const loading = useSelector(state => state.loading)
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    // Ref cho TextInput
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const imageUrl =
        'https://assets.teenvogue.com/photos/655e58e6acbb2eb839ac2f09/16:9/w_2560%2Cc_limit/AVTR_101_Unit_01655.jpg'

    return (
        <ScrollView style={[styles.container]}>
            <View style={[styles.post]}>
                {/* Left */}
                <View style={styles.left}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.lineContainer}>
                        <View
                            style={[
                                styles.line,
                                { backgroundColor: currentColors.lightGray }
                            ]}
                        ></View>
                    </View>
                </View>

                {/* Right */}
                <View style={styles.right}>
                    <Text
                        style={[styles.username, { color: currentColors.text }]}
                    >
                        03.nmt
                    </Text>
                    {/* Nội dung bài đăng  */}
                    <TextInput
                        ref={inputRef}
                        multiline={true}
                        textAlignVertical="top"
                        style={[
                            styles.textInput,
                            { color: currentColors.text }
                        ]}
                        placeholder={t('compose.addThread')}
                        placeholderTextColor={currentColors.gray}
                    />
                    {/* Danh sách các ảnh, nếu có */}

                    {/* Danh sách các nút: chọn ảnh, chụp ảnh, */}
                    <View style={styles.action}>
                        <Pressable style={styles.actionButton}>
                            <Ionicons
                                name="images-outline"
                                size={hp(2.2)}
                                color={currentColors.gray}
                                style={[
                                    styles.actionIcon,
                                    { color: currentColors.gray }
                                ]}
                            />
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <Ionicons
                                name="camera-outline"
                                size={hp(2.4)}
                                color={currentColors.gray}
                                style={[
                                    styles.actionIcon,
                                    { color: currentColors.gray }
                                ]}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.addThead}>
                <View style={styles.left}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.imageThread}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    post: {
        flexDirection: 'row',
        paddingHorizontal: wp(2)
    },
    left: {
        width: wp(12),
        alignItems: 'center'
    },
    image: {
        width: wp(10),
        height: wp(10),
        borderRadius: 50
    },
    lineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp(2)
    },
    line: {
        height: '100%',
        width: 1.6,
        minHeight: wp(10),
        backgroundColor: 'gray'
    },
    right: {
        flex: 1,
        marginLeft: wp(2)
    },
    username: {
        fontSize: wp(4),
        fontWeight: theme.fonts.medium
    },
    textInput: {
        fontSize: wp(3.6)
    },
    action: {
        flexDirection: 'row',
        marginTop: wp(2)
    },
    actionButton: {
        marginRight: wp(2)
    },
    actionIcon: {},
    addThead: {
        flexDirection: 'row',
        paddingHorizontal: wp(2)
    },
    imageThread: {
        width: wp(6),
        height: wp(6),
        borderRadius: 50
    }
})
