import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import { DEFAULT_LOCALE, LOCALES } from '@/constants';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [LOCALES.EN]: { translation: en },
      [LOCALES.ES]: { translation: es },
      [LOCALES.ZH]: { translation: zh }
    },
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
