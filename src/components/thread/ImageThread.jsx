import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import theme from '../../constants/theme'
import { showToast } from '../../store/slices/toastSlice'

const ImageThread = ({ files }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [imageDimensions, setImageDimensions] = useState([])

    const imageUrls = files ? files.map(file => file.url) : []

    const fetchImageDimensions = async () => {
        try {
            const dimensions = await Promise.all(
                imageUrls.map(async uri => {
                    return new Promise((resolve, reject) => {
                        Image.getSize(
                            uri,
                            (width, height) => resolve({ width, height }),
                            error => {
                                resolve({ width: 200, height: 200 })
                            }
                        )
                    })
                })
            )
            setImageDimensions(dimensions)
        } catch (error) {
            dispatch(
                showToast({ message: t('compose.errorLoadImg'), type: 'error' })
            )
        }
    }

    useEffect(() => {
        if (imageUrls.length > 0) {
            fetchImageDimensions()
        }
    }, [imageUrls])

    return (
        <View style={styles.container}>
            {imageUrls.length > 0 ? (
                <FlatList
                    data={imageUrls}
                    renderItem={({ item, index }) => {
                        const { width, height } = imageDimensions[index] || {
                            width: 0,
                            height: 0
                        }

                        if (width === 0 || height === 0) return null

                        const aspectRatio = width / height
                        const calculatedWidth = 200 * aspectRatio

                        return (
                            <View
                                style={[
                                    styles.imageContainer,
                                    { width: calculatedWidth }
                                ]}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={[styles.image, { height: 200 }]}
                                    resizeMode="cover"
                                />
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    skeletonContainer: {
        flexDirection: 'row'
    },
    skeletonImage: {
        width: 200,
        height: 200,
        borderRadius: theme.radius.xxs,
        marginRight: 10
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10
    },
    image: {
        width: '100%',
        borderRadius: theme.radius.xxs
    },
    emptyContainer: {
        height: 0
    }
})

export default ImageThread
