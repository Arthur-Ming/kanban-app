import InputText from 'components/Forms/InputText';
import { IBoard, ICreationInput } from 'interfaces';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { updateBoard } from 'redux/actions/board';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

type Inputs = ICreationInput;

type DispatchProps = {
  update: (data: ICreationInput) => void;
};

type OwnProps = {
  board?: IBoard;
};

type Props = OwnProps & DispatchProps;

const BoardUpdate = ({ board, update }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form className={styles.box} onSubmit={handleSubmit(update)}>
      <InputText<Inputs>
        error={errors.title}
        register={register}
        name="title"
        required="this field is required!"
        defaultValue={board?.title}
        extraClass={styles.input}
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch, { board }: OwnProps) => ({
  update: (body: ICreationInput) => {
    if (!board) return;
    dispatch(updateBoard({ board, body }));
  },
});

export default connect(null, mapDispatchToProps)(BoardUpdate);
