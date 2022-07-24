import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import styles from './styles.module.scss';

const TEXT_CONFIRM_POPUP: ITEXT = {
  cancel: {
    en: 'cancel',
    ru: 'отмена',
  },
  ok: {
    en: 'ok',
    ru: 'да',
  },
};

interface IProps {
  title: string;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const ConfirmPopup = ({ title, onLeftClick, onRightClick }: IProps) => {
  const lang = useLanguage();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.buttons}>
        <input
          type="submit"
          className={styles.button_ok}
          onClick={onRightClick}
          value={TEXT_CONFIRM_POPUP.ok[lang]}
          autoFocus={true}
        />
        <input
          type="submit"
          className={styles.button_cancel}
          onClick={onLeftClick}
          value={TEXT_CONFIRM_POPUP.cancel[lang]}
        />
      </div>
    </div>
  );
};

export default ConfirmPopup;
