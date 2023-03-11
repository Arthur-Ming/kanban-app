import InputText from 'components/Forms/InputText';
import useOutside from 'hooks/useOutside';
import { IBoard, ICreationInput, IFetchError } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
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
  const [update, { isLoading, isError, isSuccess, error }] = useUpdateBoardMutation();
  const navigate = useNavigate();

  const onCancel = () => navigate(`/boards/${board?.id}`);

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to update board', {
      toastId: errorStatus,
    });
  }
  if (isSuccess) {
    onCancel();
  }

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((body) => {
        update({ board, body });
      })}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onCancel();
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
        disabled={isLoading}
      />
    </form>
  );
};

export default BoardUpdate;
