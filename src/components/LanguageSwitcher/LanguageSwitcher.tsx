import { useContext } from 'react';

import styles from './language-switcher.module.scss';
import languageContext from '../../contexts/language-context';

import { BsGlobe } from 'react-icons/bs';

const LanguageSwitcher = () => {
  const { lang, setLang, languages } = useContext(languageContext);

  const onChange = (e: { target: { value: string } }) => setLang(e.target.value);
  return (
    <fieldset className={styles.switcher}>
      <BsGlobe className={styles.globe} />
      <span>
        {languages.map(({ key, label }) => (
          <label key={key} className={styles.switcherBtn}>
            <input type="radio" value={key} checked={key === lang} onChange={onChange} />
            <span>{label}</span>
          </label>
        ))}
      </span>
    </fieldset>
  );
};

export default LanguageSwitcher;
