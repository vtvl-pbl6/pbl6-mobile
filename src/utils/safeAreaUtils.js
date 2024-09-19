import { useSafeAreaInsets } from 'react-native-safe-area-context'

const getSafeAreaTop = () => {
    const insets = useSafeAreaInsets()
    return insets.top
}

const getSafeAreaBottom = () => {
    const insets = useSafeAreaInsets()
    return insets.bottom
}

export { getSafeAreaBottom, getSafeAreaTop }
