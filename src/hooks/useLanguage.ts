import { useContext } from 'react';
import languageContext from '../contexts/language-context';

export function useLanguage() {
  const { lang } = useContext(languageContext);
  return lang;
}
