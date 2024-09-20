import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../../store/slices/toastSlice'

const ToastManager = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const { toasts } = useSelector(state => state.toast)

    useEffect(() => {
        if (toasts.length > 0) {
            const { message, type } = toasts[0]

            toast.show(message, {
                type,
                placement: 'top',
                duration: 4000,
                offset: 30,
                onDismiss: () => {
                    dispatch(hideToast())
                }
            })

            const timer = setTimeout(() => {
                dispatch(hideToast())
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [toasts, toast, dispatch])

    return null
}

export default ToastManager
