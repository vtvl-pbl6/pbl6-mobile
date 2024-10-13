import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { BaseHeader, ReplyThread, ScreenWapper, Thread } from '../../components'
import NewReplyThread from '../../components/thread/NewReplyThread'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { wp } from '../../utils'

const ThreadDetailScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const route = useRoute()

    const { thread } = route.params

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    const getComments = () => {
        if (thread && thread.comments) {
            setComments(thread.comments)
        }
    }

    const handleThreadPress = thread => {
        navigation.navigate('ThreadDetail', { thread: thread })
    }

    useEffect(() => {
        getComments()
    }, [thread])

    return (
        <ScreenWapper>
            {/* Header */}
            <BaseHeader
                title={t('threadDetail.header')}
                onBackPress={() => navigation.goBack()}
            />

            {/* Thread */}
            <Thread thread={thread} />

            {/* Comment */}
            <View
                style={{
                    paddingVertical: wp(4),
                    paddingHorizontal: wp(2),
                    borderBottomColor: currentColors.lightGray,
                    borderBottomWidth: 0.4
                }}
            >
                <Text
                    style={{ fontWeight: theme.fonts.bold, fontSize: wp(3.6) }}
                >
                    {t('threadDetail.replies')}
                </Text>
            </View>
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
                ListFooterComponent={null}
            />
            <NewReplyThread thread={thread} />
        </ScreenWapper>
    )
}

export default ThreadDetailScreen

const styles = StyleSheet.create({})
