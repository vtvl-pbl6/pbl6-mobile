import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import {
    BaseModal,
    ProfileSearchLoader,
    ScreenWapper,
    UserInfoCard
} from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { hp, wp } from '../../utils'

const SearchScreen = () => {
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const [isFocused, setIsFocused] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)

    // Modal states
    const [modalVisible, setModalVisible] = useState(false)
    const [userIdToUnfollow, setUserIdToUnfollow] = useState(null)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
        console.log(searchInput)
    }

    const handleReset = () => {
        setSearchInput('')
    }

    const userResult = [
        {
            id: 1,
            email: 'user@gmail.com',
            first_name: 'Vinh',
            last_name: 'Pham',
            status: 'ACTIVE',
            role: 'USER',
            display_name: 'vinhthanh.73',
            avatar_file:
                'https://instagram.fdad1-2.fna.fbcdn.net/v/t51.2885-19/428595021_1561446368019570_2196514679752010103_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=-DrMtkSDP3MQ7kNvgHGTkKy&_nc_gid=6dca3db8acaf40cd8b9e47def52b3345&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYDHvuOfRrKbHj2yRZNUS9K1PcvoiS15P-8sBIHEzHsyTw&oe=670C6269&_nc_sid=49cb7f',
            follower_num: 30,
            is_following: false
        },
        {
            id: 1005,
            email: 'maithuphuong@gmail.com',
            first_name: 'Default',
            last_name: 'Name',
            status: 'ACTIVE',
            role: 'USER',
            display_name: 'mp.het.thoi',
            avatar_file: null,
            follower_num: 12,
            is_following: true
        }
    ]

    useEffect(() => {
        setSearchResults(userResult)
    }, [])

    const handleFollow = userId => {
        console.log(`Following user with ID: ${userId}`)
    }

    const handleUnfollow = userId => {
        setUserIdToUnfollow(userId)
        setModalVisible(true)
    }

    const confirmUnfollow = () => {
        console.log(`Unfollowing user with ID: ${userIdToUnfollow}`)
        setModalVisible(false)
        setUserIdToUnfollow(null) // Reset userId after the action
    }

    const cancelUnfollow = () => {
        setModalVisible(false)
        setUserIdToUnfollow(null) // Reset userId
    }

    return (
        <ScreenWapper
            styles={[
                styles.container,
                { backgroundColor: currentColors.background }
            ]}
        >
            <Text style={[styles.title, { color: currentColors.text }]}>
                {t('search.searchText')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={[
                        styles.searchContainer,
                        {
                            borderColor: currentColors.gray,
                            backgroundColor: currentColors.background,
                            flex: 1,
                            margin: wp(2),
                            borderRadius: theme.radius.md,
                            borderColor: currentColors.extraLightGray,
                            backgroundColor: currentColors.extraLightGray,
                            height: hp(5)
                        }
                    ]}
                >
                    <Ionicons
                        name="search-outline"
                        size={hp(2.3)}
                        color={currentColors.gray}
                    />
                    <TextInput
                        style={{
                            flex: 1,
                            color: currentColors.text,
                            fontSize: wp(4)
                        }}
                        placeholderTextColor={currentColors.gray}
                        autoCapitalize="none"
                        placeholder={t('search.searchText')}
                        value={searchInput}
                        onChangeText={value => setSearchInput(value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    {isFocused && searchInput !== '' && (
                        <Pressable onPress={handleReset}>
                            <Ionicons
                                name="close-circle"
                                size={hp(2.3)}
                                color={currentColors.gray}
                            />
                        </Pressable>
                    )}
                </View>
            </View>
            {loading && (
                <FlatList
                    data={[...Array(6)]}
                    renderItem={({ index }) => (
                        <ProfileSearchLoader key={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            )}
            {/* Display search results */}
            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <UserInfoCard
                            user={item}
                            onFollow={handleFollow}
                            onUnfollow={handleUnfollow}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            )}

            {/* Confirmation Modal */}
            <BaseModal
                visible={modalVisible}
                title={t('modal.confirm')}
                message={t('search.confirmUnfollow')}
                onConfirm={confirmUnfollow}
                onCancel={cancelUnfollow}
            />
        </ScreenWapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    title: {
        fontSize: wp(6),
        fontWeight: theme.fonts.bold,
        marginHorizontal: wp(2)
    },
    searchContainer: {
        flexDirection: 'row',
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.sm,
        paddingHorizontal: 18,
        gap: 12,
        borderWidth: 0.5
    }
})

export default SearchScreen
