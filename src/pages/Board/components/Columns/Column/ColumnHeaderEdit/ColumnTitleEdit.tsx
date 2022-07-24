import { FormEventHandler } from 'react';
import styles from './styles.module.scss';

interface IProps {
  value: string;
  onChange: FormEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  onKeyDown: FormEventHandler<HTMLInputElement>;
  onCancel: () => void;
}

const ColumnTitleEdit = ({ value, onChange, onKeyDown, onSubmit, onCancel }: IProps) => (
  <div className={styles.wrapper}>
    <input
      className={styles.edit_form}
      defaultValue={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus
    />
    <div className={styles.buttons}>
      <button className={styles.button_save} onClick={onSubmit}>
        save
      </button>
      <button className={styles.button_cancel} onClick={onCancel}>
        cancel
      </button>
    </div>
  </div>
);

export default ColumnTitleEdit;
