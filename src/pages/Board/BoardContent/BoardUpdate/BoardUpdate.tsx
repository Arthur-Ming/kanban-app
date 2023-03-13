import InputText from 'components/Forms/InputText';
import useOutside from 'hooks/useOutside';
import { IBoard, ICreationInput } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

type Inputs = ICreationInput;

type OwnProps = {
  board?: IBoard;
  update?: ({ body, board }: { body: ICreationInput; board: IBoard }) => void;
};

type Props = OwnProps;

const BoardUpdate = ({ board, update }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const wrapperRef: RefObject<HTMLFormElement> = useRef(null);
  useOutside<HTMLFormElement>(wrapperRef, `/boards/${board?.id}`);
  const navigate = useNavigate();

  const onCancel = () => navigate(`/boards/${board?.id}`);

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((body) => {
        update && board && update({ board, body });
        onCancel && onCancel();
      })}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onCancel && onCancel();
        }
      }}
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
