import styles from './index.module.scss';

type Props = {
  type: 'button' | 'submit';
  value: string;
  disabled: boolean;
  onClick: () => void;
};

const InputButton = ({ type, value, disabled, onClick }: Props) => (
  <input
    className={styles.button}
    disabled={disabled}
    onClick={onClick}
    type={type}
    value={value}
  />
);
export default InputButton;
