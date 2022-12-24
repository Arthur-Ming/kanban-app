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
    <div>
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
          <input
            disabled={false}
            onClick={handleSubmit(onSubmit)}
            className={styles.button}
            type="submit"
            value="Готово"
          />
          <input
            disabled={false}
            type="button"
            value="Очистить"
            onClick={() => reset()}
            className={styles.button}
          />
        </div>
      </form>
    </div>
  );
};

export default BoardCreater;
