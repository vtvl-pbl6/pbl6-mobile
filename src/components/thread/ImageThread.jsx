import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import theme from '../../constants/theme'
import { wp } from '../../utils'

const ImageThread = React.memo(({ files, imageDimensions = [] }) => {
    const [selectedImage, setSelectedImage] = useState(null)

    const openFullScreen = file => {
        setSelectedImage(file)
    }

    const closeFullScreen = () => {
        setSelectedImage(null)
    }

    return (
        <View style={styles.container}>
            {files.length > 0 ? (
                <FlatList
                    data={files}
                    renderItem={({ item, index }) => {
                        const { width = 200, height = 200 } =
                            imageDimensions[index] || {}
                        const aspectRatio = width / height
                        const calculatedWidth = 200 * aspectRatio

                        return (
                            <ImageWithPlaceholder
                                file={item}
                                width={calculatedWidth}
                                height={200}
                                isNSFW={item.nsfwResult !== null}
                                onPress={() => openFullScreen(item)}
                            />
                        )
                    }}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer} />
            )}
            {selectedImage && (
                <Modal
                    visible={true}
                    transparent={true}
                    onRequestClose={closeFullScreen}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeFullScreen}
                        >
                            <Image
                                source={{ uri: selectedImage.url }}
                                style={styles.fullscreenImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    )
})

const ImageWithPlaceholder = ({ file, width, height, isNSFW, onPress }) => {
    const [loading, setLoading] = useState(true)

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.imageContainer, { width, height }]}>
                {loading && (
                    <View style={[styles.placeholder, { width, height }]}>
                        <ActivityIndicator
                            size="small"
                            color={theme.colors.gray}
                        />
                    </View>
                )}
                <Image
                    source={{ uri: file.url }}
                    style={[
                        styles.image,
                        { width, height, opacity: loading ? 0 : 1 }
                    ]}
                    resizeMode="cover"
                    onLoadEnd={() => setLoading(false)}
                />
                {isNSFW && (
                    <BlurView
                        intensity={40}
                        style={[styles.overlay, { width, height }]}
                        blurType="light"
                    />
                )}
            </View>
        </TouchableOpacity>
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
    placeholder: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.lightGray,
        borderRadius: theme.radius.xxs
    },
    image: {
        borderRadius: theme.radius.xxs
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    emptyContainer: {
        height: 0
    },
    listContainer: {
        paddingBottom: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    fullscreenImage: {
        width: wp(100),
        height: '100%'
    },
    closeButton: {
        flex: 1
    }
})

export default ImageThread
