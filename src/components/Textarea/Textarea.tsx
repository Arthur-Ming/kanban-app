import { RefObject } from 'react';
import { ReactComponent as CloseIcon } from './cars-close.svg';
import styles from './textarea.module.scss';

interface IProps {
  onSubmit: (event: { preventDefault: () => void }) => void;
  onKeyDown: (event: { key?: string; preventDefault: () => void }) => void;
  onCloseClick: (event: { preventDefault: () => void }) => void;
  textareaEl: RefObject<HTMLTextAreaElement>;
  placeholder?: string;
  buttonTitle?: string;
  isDisabled?: boolean;
}

const Textarea = ({
  onSubmit,
  onKeyDown,
  onCloseClick,
  textareaEl,
  placeholder = '',
  buttonTitle = '',
  isDisabled = false,
}: IProps) => (
  <form onSubmit={onSubmit} className={styles.form}>
    <span className={styles['textarea-box']}>
      <textarea
        onKeyDown={onKeyDown}
        className={styles.textarea}
        placeholder={placeholder}
        defaultValue=""
        ref={textareaEl}
        disabled={isDisabled}
      />
    </span>
    <span className={styles.buttons}>
      <input
        className={styles['submit-button']}
        type="submit"
        value={buttonTitle}
        disabled={isDisabled}
      />
      <button className={styles['close-button']} onClick={onCloseClick} disabled={isDisabled}>
        <CloseIcon className={styles['close-icon']} />
      </button>
    </span>
  </form>
);

export default Textarea;
