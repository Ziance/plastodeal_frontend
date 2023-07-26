import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from "i18next-http-backend"
import {en,hi} from "./translations/resources/index"
import * as resources2 from "./translations/resources/hi"


i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // .use(HttpApi)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    default:'en',
    detection:{
      order:['cookie','htmlTag','localstorage','path','subdomain'],
      caches:['cookie'],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: { 
      en,
      hi
    }
  });
export default i18n;