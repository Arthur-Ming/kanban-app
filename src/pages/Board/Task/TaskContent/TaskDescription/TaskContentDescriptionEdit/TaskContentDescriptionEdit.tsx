import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { FormEventHandler, useEffect, useRef } from 'react';
import styles from '../styles.module.scss';

interface IProps {
  placeholder: string;
  value: string;
  onChange: FormEventHandler<HTMLTextAreaElement>;
  isDisabled: boolean;
  onCancelClick: () => void;
  onSaveClick: () => void;
}

const TEXT_TASK_CONTENT_DISCRIPTION_EDIT: ITEXT = {
  save: {
    en: 'save',
    ru: 'сохранить',
  },
  cancel: {
    en: 'cancel',
    ru: 'отмена',
  },
};

const TaskContentDescriptionEdit = ({
  placeholder,
  value,
  onChange,
  onCancelClick,
  onSaveClick,
  isDisabled,
}: IProps) => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.selectionStart = value.length;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const lang = useLanguage();
  return (
    <div>
      <textarea
        className={styles.edit_form}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
        ref={textareaEl}
        disabled={isDisabled}
      ></textarea>
      <div className={styles.buttons}>
        <button className={styles.button_save} onClick={onSaveClick} disabled={isDisabled}>
          {TEXT_TASK_CONTENT_DISCRIPTION_EDIT.save[lang]}
        </button>
        <button className={styles.button_cancel} onClick={onCancelClick} disabled={isDisabled}>
          {TEXT_TASK_CONTENT_DISCRIPTION_EDIT.cancel[lang]}
        </button>
      </div>
    </div>
  );
};

export default TaskContentDescriptionEdit;
