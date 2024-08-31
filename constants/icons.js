import { Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { hp } from '../helpers/common'
import { theme } from './theme'

export const icons = {
    home: (props) => <Entypo name="home" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    search: (props) => <FontAwesome5 name="search" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    activity: (props) => <Ionicons name="notifications" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    profile: (props) => <FontAwesome name="user" size={hp(2.8)} color={theme.colors.grayDark} {...props} />
}