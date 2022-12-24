import classNames from 'classnames';
import { FieldError, FieldValues, UseControllerProps, UseFormRegister } from 'react-hook-form';
import styles from './index.module.scss';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  required?: string;
  label?: string;
}

const InputText = <T extends FieldValues>({
  name,
  register,
  error,
  required,
  label = '',
  defaultValue,
}: Props<T>) => (
  <label className={styles.label}>
    <span>{label}</span>
    <input
      className={classNames(styles.input, {
        [styles.invalid]: error,
      })}
      type="text"
      defaultValue={defaultValue}
      {...register(name, { required })}
    />
    {error && <span className={styles.invalid_text}>{error.message}</span>}
  </label>
);

export default InputText;
