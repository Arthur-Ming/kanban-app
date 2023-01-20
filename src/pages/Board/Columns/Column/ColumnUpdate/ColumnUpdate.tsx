import { IColumn, ICreationInput } from 'interfaces';
import InputText from 'components/Forms/InputText';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';
import { updateColumn } from 'redux/actions/columns';
import { RefObject, useRef } from 'react';
import useOutside from 'hooks/useOutside';
import { useUpdateColumnMutation } from 'redux/api';

type Inputs = ICreationInput;

type OwnProps = {
  column: IColumn;
};

type Props = OwnProps;

const ColumnUpdate = ({ column }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const wrapperRef: RefObject<HTMLFormElement> = useRef(null);
  useOutside<HTMLFormElement>(wrapperRef, `/boards/${column.boardId}`);
  const [update, rest] = useUpdateColumnMutation();

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((body) => update({ column, body }))}
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
