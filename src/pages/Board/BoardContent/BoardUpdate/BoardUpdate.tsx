import InputText from 'components/Forms/InputText';
import useOutside from 'hooks/useOutside';
import { IBoard, ICreationInput } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateBoardMutation } from 'redux/api/boards';
import styles from './index.module.scss';

type Inputs = ICreationInput;

type OwnProps = {
  board?: IBoard;
};

type Props = OwnProps;

const BoardUpdate = ({ board }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const wrapperRef: RefObject<HTMLFormElement> = useRef(null);
  useOutside<HTMLFormElement>(wrapperRef, `/boards/${board?.id}`);
  const [update, rest] = useUpdateBoardMutation();

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((body) => update({ board, body }))}
      ref={wrapperRef}
    >
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

export default BoardUpdate;
