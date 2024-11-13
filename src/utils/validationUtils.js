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
    } else if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,32}$/.test(
            values.password
        )
    ) {
        errors.password = t('validation.passwordCriteria')
    }

    if (!values.confirm_password) {
        errors.confirm_password = t('validation.confirmPasswordRequired')
    } else if (values.confirm_password !== values.password) {
        errors.confirm_password = t('validation.passwordMismatch')
    }

    return errors
}

export const validatePassword = (values, t) => {
    let errors = {}

    if (!values.oldPassword) {
        errors.oldPassword = t('validation.oldPasswordRequired')
    }

    if (!values.newPassword) {
        errors.newPassword = t('validation.newPasswordRequired')
    } else if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,32}$/.test(
            values.newPassword
        )
    ) {
        errors.newPassword = t('validation.passwordCriteria')
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = t('validation.confirmPasswordRequired')
    } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = t('validation.passwordMismatch')
    }

    return errors
}
