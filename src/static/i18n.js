import i18n, { loadResources } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: require('./_locales/en/translations.json')
      },
      fr: {
        translation: require('./_locales/fr/translations.json')
      },
      es: {
        translation: require('./_locales/es/translations.json')
      },
      ru: {
        translation: require('./_locales/ru/translations.json')
      },
      de: {
        translation: require('./_locales/de/translations.json')
      },
      zh: {
        translation: require('./_locales/zh/translations.json')
      },
      pt: {
        translation: require('./_locales/pt/translations.json')
      }
    },
  });

export default i18n;
