import { useFocusEffect, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    BaseHeader,
    Loading,
    ReplyThread,
    ScreenWapper,
    Thread
} from '../../components'
import NewReplyThread from '../../components/thread/NewReplyThread'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import threadService from '../../services/threadServices'
import { setComments, setThreadDetail } from '../../store/slices/threadSlice'
import { wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ThreadDetailScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const route = useRoute()
    const handleError = useHandleError(navigation)

    const { threadId } = route.params

    const comments = useSelector(state => state.threads.comments)
    const thread = useSelector(state => state.threads.threadDetail)
    const insets = useSafeAreaInsets()

    const [loading, setLoading] = useState(false)
    const [paddingBottom, setPaddingBottom] = useState(insets.bottom)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setPaddingBottom(0)
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setPaddingBottom(insets.bottom)
            }
        )

        // Cleanup listeners on unmount
        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [insets.bottom])

    const getThreadById = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await threadService.getById(threadId)
            const { data, is_success } = response
            if (is_success) {
                dispatch(setThreadDetail(data))
                dispatch(setComments(data.comments))
            }
        } catch (error) {
            dispatch(handleError(error))
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getThreadById()
        }, [threadId])
    )

    const handleThreadPress = thread => {
        // navigation.navigate('ThreadDetail', { thread: thread })
    }

    if (loading) {
        return (
            <ScreenWapper>
                <Loading />
            </ScreenWapper>
        )
    }

    return (
        <ScreenWapper>
            <BaseHeader
                title={t('threadDetail.header')}
                onBackPress={() => navigation.goBack()}
            />

            <FlatList
                data={comments}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleThreadPress(item)}>
                        <ReplyThread thread={item} loading={loading} />
                    </Pressable>
                )}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={() => (
                    <>
                        {thread && <Thread thread={thread} />}
                        <View
                            style={{
                                paddingVertical: wp(4),
                                paddingHorizontal: wp(2),
                                borderBottomColor: currentColors.lightGray,
                                borderBottomWidth: 0.4
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: theme.fonts.bold,
                                    fontSize: wp(3.6),
                                    color: currentColors.text
                                }}
                            >
                                {t('threadDetail.replies')}
                            </Text>
                        </View>
                    </>
                )}
            />
            {thread && (
                <View style={{ marginBottom: paddingBottom }}>
                    <NewReplyThread thread={thread} />
                </View>
            )}
        </ScreenWapper>
    )
}

export default ThreadDetailScreen
