import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWapper = ({children, bg}) => {

    const top = useSafeAreaInsets()
    const paddingTop = top>0 ? top+5 : 40
    return (
        <View style={{ flex: 1, backgroundColor: bg, paddingTop: paddingTop}}>
            {
                children
            }
        </View>
    )
}

export default ScreenWapper