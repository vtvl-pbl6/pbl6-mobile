import { Entypo, FontAwesome, FontAwesome5, Ionicons, Feather, } from '@expo/vector-icons'
import { hp } from '../helpers/common'
import { theme } from './theme'

export const icons = {
    home: (props) => <Entypo name="home" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    search: (props) => <FontAwesome5 name="search" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    activity: (props) => <Ionicons name="notifications" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    profile: (props) => <FontAwesome name="user" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    arrowLeft: (props) => <Entypo name="chevron-left" size={hp(3)} color={theme.colors.text} {...props} />,
    mail: (props) => <Feather name="mail" size={hp(3)} color={theme.colors.text} {...props} />,
    lock: (props) => <Feather name="lock" size={hp(3)} color={theme.colors.text} {...props}  />,
    unlock: (props) => <Feather name="unlock" size={hp(3)} color={theme.colors.text} {...props} />,
    user: (props) => <Feather name="user" size={hp(3)} color={theme.colors.text} {...props} />,
    notification: (props) => <Ionicons name="notifications" size={hp(2.8)} color={theme.colors.grayDark} {...props} />,
    profile: (props) => <FontAwesome name="user" size={hp(2.8)} color={theme.colors.grayDark} {...props} />
}