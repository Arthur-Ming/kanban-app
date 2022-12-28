import InputButton from 'components/Forms/InputButton/InputButton';
import InputText from 'components/Forms/InputText';
import Textarea from 'components/Forms/Textarea';
import { ICreateBoardBody } from 'interfaces';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createBoard } from 'redux/actions/boards';
import { requestFetchingSelector } from 'redux/selectors/requests';
import { RootState } from 'redux/store';
import { apiRoutes } from 'utils/api';
import { buildKey, CRUD } from 'utils/requestService';
import styles from './index.module.scss';

type Inputs = ICreateBoardBody;

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  createBoard: (body: ICreateBoardBody) => void;
};

type Props = DispatchProps & StateProps;

const BoardCreationForm = ({ createBoard, isLoading }: Props) => {
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
          disabled={isLoading}
          type="submit"
          value="Готово"
          onClick={handleSubmit(createBoard)}
        />
        <InputButton disabled={isLoading} type="button" value="Очистить" onClick={() => reset()} />
      </div>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: requestFetchingSelector(state, buildKey(apiRoutes.boards(), CRUD.create)),
});

const mapDispatchToProps = {
  createBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardCreationForm);
