import { IColumn, ICreationInput, IFetchError } from 'interfaces';
import InputText from 'components/Forms/InputText';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { RefObject, useRef } from 'react';
import useOutside from 'hooks/useOutside';
import { useUpdateColumnMutation } from 'redux/api/columns';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

type Inputs = ICreationInput;

type OwnProps = {
  column: IColumn;
  update: ({ body, column }: { body: ICreationInput; column: IColumn }) => void;
};

type Props = OwnProps;

const ColumnUpdate = ({ column, update }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const wrapperRef: RefObject<HTMLFormElement> = useRef(null);
  useOutside<HTMLFormElement>(wrapperRef, `/boards/${column.boardId}`);

  const navigate = useNavigate();

  const onCancel = () => navigate(`/boards/${column.boardId}`);

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((body) => {
        onCancel();
        update({ column, body });
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
        defaultValue={column.title}
        extraClass={styles.input}
      />
    </form>
  );
};

export default ColumnUpdate;
