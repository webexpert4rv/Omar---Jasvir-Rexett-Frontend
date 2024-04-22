import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageChange = () => {
    const [t,i18n] = useTranslation("global")

    const handleLanguageChange=(lang)=>{
        i18n.changeLanguage(lang.target.value)

    }
  return (
    <div>
       <select onChange={handleLanguageChange}>
                            <option value="en">EN</option>
                            <option value="sv">SV</option>
                        </select>
    </div>
  )
}

export default LanguageChange
