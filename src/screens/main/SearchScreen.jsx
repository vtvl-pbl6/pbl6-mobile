import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    BaseModal,
    ProfileSearchLoader,
    ScreenWapper,
    UserInfoCard
} from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import userService from '../../services/userServices'
import { debounce, hp, wp } from '../../utils'
import useHandleError from '../../utils/handlers/errorHandler'

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const handleError = useHandleError(navigation)
    const update = useSelector(state => state.update)

    const [isFocused, setIsFocused] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isStateReset, setIsStateReset] = useState(false)

    // Modal states
    const [modalVisible, setModalVisible] = useState(false)
    const [userIdToUnfollow, setUserIdToUnfollow] = useState(null)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const handleReset = () => {
        setSearchInput('')
        setSearchResults([])
        setPage(1)
        setHasMore(false)
    }

    const handleSearch = async (isNewSearch = false) => {
        if (loading) return
        setLoading(true)

        try {
            const currentPage = isNewSearch ? 1 : page
            const response = await userService.searchUser(
                searchInput,
                currentPage
            )

            const { data, is_success, metadata } = response

            if (is_success) {
                if (isNewSearch || currentPage === 1) {
                    setSearchResults(data)
                    setPage(1)
                } else {
                    setSearchResults(prev => {
                        const newUsers = data.filter(
                            user => !prev.some(u => u.id === user.id)
                        )
                        return [...prev, ...newUsers]
                    })
                }

                if (metadata.current_page >= metadata.total_page) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                }
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const debouncedSearch = useCallback(
        debounce(text => {
            if (text.trim()) {
                handleSearch(true)
            } else {
                setSearchResults([])
            }
        }, 300),
        []
    )

    useEffect(() => {
        debouncedSearch(searchInput)
    }, [searchInput, debouncedSearch])

    const reloadAPIs = async () => {
        setSearchResults([])
        setPage(1)
        setHasMore(false)

        setIsStateReset(true)
    }

    useEffect(() => {
        if (isStateReset) {
            const fetchData = async () => {
                await handleSearch()
                setIsStateReset(false)
            }
            fetchData()
        }
    }, [isStateReset])

    useEffect(() => {
        if (update) {
            reloadAPIs()
        }
    }, [update])

    const loadMoreUsers = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    useEffect(() => {
        if (page != 1) {
            handleSearch()
        }
    }, [page])

    const handleProfileNavigation = userId => {
        navigation.navigate('UserProfile', { userId: userId })
    }

    const handleUnfollow = userId => {
        setUserIdToUnfollow(userId)
        setModalVisible(true)
    }

    const confirmUnfollow = () => {
        console.log(`Unfollowing user with ID: ${userIdToUnfollow}`)
        setModalVisible(false)
        setUserIdToUnfollow(null)
    }

    const cancelUnfollow = () => {
        setModalVisible(false)
        setUserIdToUnfollow(null)
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
                            borderColor: currentColors.extraLightGray,
                            backgroundColor: currentColors.extraLightGray,
                            flex: 1,
                            margin: wp(2),
                            borderRadius: theme.radius.md,
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
                        onSubmitEditing={handleSearch}
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

            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <UserInfoCard
                            user={item}
                            onUnfollow={handleUnfollow}
                            onGoToProfile={handleProfileNavigation}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={loadMoreUsers}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={loading && <ProfileSearchLoader />}
                />
            )}

            {loading && searchResults.length === 0 && (
                <FlatList
                    data={[...Array(6)]}
                    renderItem={({ index }) => (
                        <ProfileSearchLoader key={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            )}

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
    },
    loadMoreButton: {
        padding: 10,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        marginVertical: 10
    },
    loadMoreText: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    }
})

export default SearchScreen
