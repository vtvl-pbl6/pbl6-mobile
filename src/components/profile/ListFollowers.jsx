import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useLanguage, useTheme } from '../../contexts'
import userService from '../../services/userServices'
import useHandleError from '../../utils/handlers/errorHandler'
import UserInfoCard from '../card/UserInfoCard'
import ProfileSearchLoader from '../load/ProfileSearchLoader'

const ListFollowers = () => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()
    const navigation = useNavigation()
    const handleError = useHandleError(navigation)

    const currentUser = useSelector(state => state.user.user)

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [followers, setFollowers] = useState([])
    const [hasMoreFollower, setHasMoreFollower] = useState(false)

    const fetchFollowers = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await userService.getFollowers(
                currentUser.id,
                page
            )
            const { data, is_success, metadata } = response

            if (is_success) {
                setFollowers(prevFollowers => [
                    ...prevFollowers,
                    ...data.filter(
                        follower =>
                            !prevFollowers.some(t => t.id === follower.id)
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
        fetchFollowers()
    }, [page])

    const loadMoreFollowers = () => {
        if (hasMoreFollower && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    if (loading && page === 1) {
        return <ProfileSearchLoader />
    }

    return (
        <FlatList
            data={followers}
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
            onEndReached={loadMoreFollowers}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ProfileSearchLoader />}
        />
    )
}

export default ListFollowers

const styles = StyleSheet.create({})
