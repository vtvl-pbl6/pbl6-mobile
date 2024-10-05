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
import ImageSize from 'react-native-image-size'
import { useDispatch } from 'react-redux'
import theme from '../../constants/theme'

const ImagePreview = ({ images, onRemove }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [imageDimensions, setImageDimensions] = useState([])

    const fetchImageDimensions = async () => {
        try {
            const dimensions = await Promise.all(
                images.map(uri => ImageSize.getSize(uri))
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
                        const { width = 200, height = 200 } =
                            imageDimensions[index] || {}
                        const aspectRatio = width / height
                        const calculatedWidth = 200 * aspectRatio

                        return (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: item }}
                                    style={{
                                        width: calculatedWidth,
                                        height: 200,
                                        borderRadius: theme.radius.xxs
                                    }}
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
