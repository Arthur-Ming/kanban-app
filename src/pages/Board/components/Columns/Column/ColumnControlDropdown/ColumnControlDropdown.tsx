import Dropdown from 'components/Dropdown';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import styles from './styles.module.scss';

const TEXT_COLUMN_CONTROL_DROPDOWN: ITEXT = {
  remove: {
    en: 'remove',
    ru: 'удалить',
  },
  edit: {
    en: 'edit',
    ru: 'редактировать',
  },
};

interface IProps {
  title: string;
  onCloseClick: () => void;
  onEditClick: () => void;
  onRemoveClick: () => void;
}

const ColumnControlDropdown = ({ title, onCloseClick, onEditClick, onRemoveClick }: IProps) => {
  const lang = useLanguage();
  return (
    <Dropdown onCloseClick={onCloseClick} title={title}>
      <ul className={styles.dropdown_body}>
        <li className={styles.dropdown_li} onClick={onEditClick}>
          <span>{TEXT_COLUMN_CONTROL_DROPDOWN.edit[lang]}</span>
        </li>
        <li className={styles.dropdown_li} onClick={onRemoveClick}>
          <span>{TEXT_COLUMN_CONTROL_DROPDOWN.remove[lang]}</span>
        </li>
      </ul>
    </Dropdown>
  );
};

export default ColumnControlDropdown;
