import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { logout, showToast } from '../../store/slices'

const TOKEN_ERROR_CODES = ['ERR_API0101']
const SKIP_ERROR_CODES = ['ERR_REP0101']

const useHandleError = navigation => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleError = error => {
        if (error && error.errors && error.errors.length > 0) {
            error.errors.forEach(err => {
                if (!SKIP_ERROR_CODES.includes(err.code)) {
                    const message = err.message || t('error.default')
                    dispatch(showToast({ message, type: 'error' }))
                }
            })
        } else {
            dispatch(showToast({ message: t('error.default'), type: 'error' }))
        }

        // Handle token related errors
        if (
            error.errors &&
            error.errors.some(err => TOKEN_ERROR_CODES.includes(err.code))
        ) {
            dispatch(logout())
            navigation.navigate('Login')
        }
    }

    return handleError
}

export default useHandleError
