import React from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALES } from '@/constants';

const LANGUAGE_OPTIONS = [
  { code: LOCALES.EN, label: 'EN', flag: '🇺🇸', name: 'English' },
  { code: LOCALES.ES, label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: LOCALES.ZH, label: '中文', flag: '🇨🇳', name: '中文' }
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      {LANGUAGE_OPTIONS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
            i18n.language === lang.code
              ? 'bg-primary text-white dark:bg-primary-light'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label={lang.name}
          title={lang.name}
        >
          <span className="mr-1">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
};
