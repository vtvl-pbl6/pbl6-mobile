import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { capitalizeFirstLetter, daysUntilToday, wp } from '../../utils'
import AvatarNotification from './AvatarNotification'

const CommentNotification = ({ notification }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const { content, created_at, id, read, sender, type, updated_at } =
        notification

    const extractContent = html => {
        const regex = /<\/strong>(.*)/
        const match = html.match(regex)
        return match ? match[1].trim() : ''
    }

    const extractedContent = extractContent(content)

    return (
        <View
            style={[
                styles.container,
                { borderBottomColor: currentColors.lightGray }
            ]}
        >
            <AvatarNotification
                user={sender}
                currentColors={currentColors}
                type={type}
            />
            <View style={styles.main}>
                <View style={styles.top}>
                    <Text
                        style={{
                            fontWeight: theme.fonts.extraBold,
                            fontSize: wp(4),
                            color: currentColors.text
                        }}
                    >
                        {sender.display_name}
                    </Text>
                    <Text
                        style={{ color: currentColors.gray, fontSize: wp(4) }}
                    >
                        {daysUntilToday(created_at)}
                    </Text>
                </View>
                <Text style={{ fontSize: wp(4), color: currentColors.gray }}>
                    {capitalizeFirstLetter(extractedContent)}
                </Text>
            </View>
        </View>
    )
}

export default CommentNotification

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: wp(4),
        paddingHorizontal: wp(1),
        borderBottomWidth: 0.4,
        borderRadius: theme.radius.md
    },
    main: {
        width: '100%',
        marginLeft: wp(3),
        flex: 1,
        justifyContent: 'space-around'
    },
    top: {
        flexDirection: 'row',
        gap: 10
    }
})
