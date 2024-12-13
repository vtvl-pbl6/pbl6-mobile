import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useLanguage, useTheme } from '../../contexts'
import userService from '../../services/userServices'
import useHandleError from '../../utils/handlers/errorHandler'
import UserInfoCard from '../card/UserInfoCard'
import ProfileSearchLoader from '../load/ProfileSearchLoader'

const ListFollowed = ({ user }) => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const navigation = useNavigation()
    const handleError = useHandleError(navigation)

    const currentUser = useSelector(state => state.user.user)

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [followed, setFollowed] = useState([])
    const [hasMoreFollower, setHasMoreFollower] = useState(false)

    const fetchFollowed = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.getFollowed(
                user?.id || currentUser.id,
                page
            )
            const { data, is_success, metadata } = response

            if (is_success) {
                setFollowed(prevFollowed => [
                    ...prevFollowed,
                    ...data.filter(
                        follower =>
                            !prevFollowed.some(t => t.id === follower.id)
                    )
                ])
                setHasMoreFollower(metadata.current_page < metadata.total_page)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFollowed()
    }, [page])

    const loadMoreFollowed = () => {
        if (hasMoreFollower && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    if (loading && page === 1) {
        return <ProfileSearchLoader />
    }

    return (
        <FlatList
            data={followed}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <UserInfoCard
                    user={item}
                    onGoToProfile={() =>
                        navigation.navigate('UserProfile', { userId: item.id })
                    }
                />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreFollowed}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ProfileSearchLoader />}
        />
    )
}

export default ListFollowed

const styles = StyleSheet.create({})
