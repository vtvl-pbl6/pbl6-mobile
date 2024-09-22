export const validateRegisterForm = (values, t) => {
    let errors = {}

    if (!values.username) {
        errors.username = t('validation.usernameRequired')
    } else if (values.username.length <= 5) {
        errors.username = t('validation.usernameMinLength')
    }

    if (!values.email) {
        errors.email = t('validation.emailRequired')
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = t('validation.invalidEmail')
    }

    if (!values.password) {
        errors.password = t('validation.passwordRequired')
    } else if (values.password.length < 6) {
        errors.password = t('validation.passwordMinLength')
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = t('validation.confirmPasswordRequired')
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = t('validation.passwordMismatch')
    }

    return errors
}
