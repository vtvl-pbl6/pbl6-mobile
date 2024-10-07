import React, { useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    View
} from 'react-native'
import theme from '../../constants/theme'

const ImageThread = React.memo(({ files, imageDimensions = [] }) => {
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
        </View>
    )
})

const ImageWithPlaceholder = ({ file, width, height }) => {
    const [loading, setLoading] = useState(true)

    return (
        <View style={[styles.imageContainer, { width, height }]}>
            {loading && (
                <View style={[styles.placeholder, { width, height }]}>
                    <ActivityIndicator size="small" color={theme.colors.gray} />
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
    emptyContainer: {
        height: 0
    },
    listContainer: {
        paddingBottom: 10
    }
})

export default ImageThread
