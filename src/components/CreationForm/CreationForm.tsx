import InputButton from 'components/Forms/InputButton/InputButton';
import InputText from 'components/Forms/InputText';
import { ICreationInput } from 'interfaces';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';

type Inputs = ICreationInput;

type OwnProps = {
  isLoading: boolean;
  placeholder?: string;
  onSubmit: (body: ICreationInput) => void;
  onCancel: () => void;
};

type Props = OwnProps;

const CreationForm = ({ onSubmit, onCancel, isLoading, placeholder }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form className={styles.box}>
      <InputText<Inputs>
        error={errors.title}
        register={register}
        name="title"
        required="this field is required!"
        placeholder={placeholder}
      />
      <div className={styles.buttons}>
        <InputButton
          disabled={isLoading}
          type="submit"
          value="Готово"
          onClick={handleSubmit(onSubmit)}
        />
        <InputButton disabled={isLoading} type="button" value="Очистить" onClick={onCancel} />
      </div>
    </form>
  );
};

export default CreationForm;
