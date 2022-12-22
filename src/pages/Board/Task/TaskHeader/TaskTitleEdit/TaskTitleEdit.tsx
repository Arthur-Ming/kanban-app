import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { FormEventHandler, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const TEXT_TASK_TITLE_EDIT: ITEXT = {
  save: {
    en: 'save',
    ru: 'сохранить',
  },
  cancel: {
    en: 'cancel',
    ru: 'отмена',
  },
};

interface IProps {
  value: string;
  onChange: FormEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  onKeyDown: FormEventHandler<HTMLInputElement>;
  onCancel: () => void;
}

const TaskTitleEdit = ({ value, onChange, onKeyDown, onSubmit, onCancel }: IProps) => {
  const textareaEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.selectionStart = value.length;
      textareaEl.current.selectionEnd = value.length;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lang = useLanguage();

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.edit_form}
        defaultValue={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
        ref={textareaEl}
      ></input>
      <div className={styles.buttons}>
        <button className={styles.button_save} onClick={onSubmit}>
          {TEXT_TASK_TITLE_EDIT.save[lang]}
        </button>
        <button className={styles.button_cancel} onClick={onCancel}>
          {TEXT_TASK_TITLE_EDIT.cancel[lang]}
        </button>
      </div>
    </div>
  );
};

export default TaskTitleEdit;
