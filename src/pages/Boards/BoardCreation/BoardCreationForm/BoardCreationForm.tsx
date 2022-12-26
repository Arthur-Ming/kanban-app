import InputButton from 'components/Forms/InputButton/InputButton';
import InputText from 'components/Forms/InputText';
import Textarea from 'components/Forms/Textarea';
import { ICreateBoardBody } from 'interfaces';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createBoard } from 'redux/actions/boards';
import styles from './index.module.scss';

type Inputs = ICreateBoardBody;

type DispatchProps = {
  createBoard: (body: ICreateBoardBody) => void;
};

type Props = DispatchProps;

const BoardCreationForm = ({ createBoard }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  return (
    <form className={styles.box}>
      <InputText<Inputs>
        error={errors.title}
        register={register}
        name="title"
        label="Заголовок доски"
        required="this field is required!"
      />
      <Textarea
        error={errors.description}
        register={register}
        name="description"
        label="Описание"
      />
      <div className={styles.buttons}>
        <InputButton
          disabled={false}
          type="submit"
          value="Готово"
          onClick={handleSubmit(createBoard)}
        />
        <InputButton disabled={false} type="button" value="Очистить" onClick={() => reset()} />
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  createBoard,
};

export default connect(null, mapDispatchToProps)(BoardCreationForm);
