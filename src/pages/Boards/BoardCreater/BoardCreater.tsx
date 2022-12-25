import InputButton from 'components/Forms/InputButton/InputButton';
import InputText from 'components/Forms/InputText';
import Textarea from 'components/Forms/Textarea';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';

type Inputs = {
  title: string;
  description: string;
};

const BoardCreater = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);
  return (
    <div className={styles.box}>
      <h4>Создать доску</h4>
      <form>
        <InputText<Inputs>
          error={errors.title}
          register={register}
          name="title"
          label="Заголовок доски"
          required="this field is required!"
        />
        <Textarea error={errors.title} register={register} name="description" label="Описание" />
        <div className={styles.buttons}>
          <InputButton
            disabled={false}
            type="submit"
            value="Готово"
            onClick={handleSubmit(onSubmit)}
          />
          <InputButton disabled={false} type="button" value="Очистить" onClick={() => reset()} />
        </div>
      </form>
    </div>
  );
};

export default BoardCreater;
