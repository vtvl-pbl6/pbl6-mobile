import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { showToast } from '../../store/slices/toastSlice'

const ImagePreview = ({ images, onRemove }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [imageDimensions, setImageDimensions] = useState([])
    const [error, setError] = useState(false)

    const fetchImageDimensions = async () => {
        setError(false)
        try {
            const dimensions = await Promise.all(
                images.map(async uri => {
                    return new Promise((resolve, reject) => {
                        Image.getSize(
                            uri,
                            (width, height) => {
                                resolve({ width, height })
                            },
                            error => {
                                reject(error)
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
        if (images.length > 0) {
            fetchImageDimensions()
        }
    }, [images])

    return (
        <View style={styles.container}>
            {images.length > 0 ? (
                <FlatList
                    data={images}
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
                                <TouchableOpacity
                                    onPress={() => onRemove(index)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons
                                        name="close-outline"
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.toString()}
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
    imageContainer: {
        position: 'relative',
        marginRight: 10
    },
    image: {
        width: '100%',
        height: 200
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 2
    },
    emptyContainer: {
        height: 0
    }
})

export default ImagePreview
