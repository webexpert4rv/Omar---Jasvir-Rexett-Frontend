import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageChange = () => {
  const [t, i18n] = useTranslation("global");
  let lang= localStorage.getItem("language")
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(()=>{
    if(lang){
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang);
    }
  },[])
  console.log(selectedLanguage , "selectedlanguage")
  console.log(lang,"lang")

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    localStorage.setItem("language",lang)
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  }

  return (
    <div className='language-wrapper position-relative'>
      <select value={lang } className={`language-select form-control form-select shadow-none ${selectedLanguage === 'en' ? 'lang-uk' : 'lang-swd'}`} onChange={handleLanguageChange}>
        <option value="en" className='lang-option'>EN</option>
        <option value="sv" className='lang-option'>SV</option>
      </select>
    </div>
  )
}

export default LanguageChange
