import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('app.title')}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {t('header.welcome', { name: userName })}
            </p>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
