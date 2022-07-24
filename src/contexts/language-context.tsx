import { createContext, useState, SetStateAction } from 'react';

const languagesMap = {
  ru: 'RU',
  en: 'EN',
};

const languages = Object.entries(languagesMap).map(([key, value]) => ({
  key,
  label: value,
}));

const defaultValue: {
  lang: string;
  setLang: React.Dispatch<SetStateAction<string>>;
  languages: { key: string; label: string }[];
} = {
  lang: 'en',
  setLang: (lang) => lang,
  languages,
};

const languageContext = createContext(defaultValue);
const { Provider } = languageContext;

interface IProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: IProps) {
  const [lang, setLang] = useState(defaultValue.lang);

  return <Provider value={{ lang, setLang, languages }}>{children}</Provider>;
}

export default languageContext;
