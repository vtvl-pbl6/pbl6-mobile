import React, { createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext()

export const useLanguage = () => {
    return useContext(LanguageContext)
}

const LanguageProvider = ({ children }) => {
    const { t, i18n } = useTranslation()

    return (
        <LanguageContext.Provider value={{ t, i18n }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider
