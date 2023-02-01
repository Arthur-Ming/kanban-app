import InputText from 'components/Forms/InputText';
import useOutside from 'hooks/useOutside';
import { ICreationInput, ITask } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useUpdateTaskMutation } from 'redux/api/tasks';
import styles from './index.module.scss';

type Inputs = ICreationInput;

type OwnProps = {
  task?: ITask;
};

type Props = OwnProps;

const TaskUpdate = ({ task }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const wrapperRef: RefObject<HTMLFormElement> = useRef(null);
  useOutside<HTMLFormElement>(
    wrapperRef,
    `/boards/${task?.boardId}/columns/${task?.columnId}/tasks/${task?.id}`
  );
  const [update] = useUpdateTaskMutation();
  const navigate = useNavigate();

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((body) => {
        update({ task, body });
        navigate(`/boards/${task?.boardId}/columns/${task?.columnId}/tasks/${task?.id}`);
      })}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          navigate(`/boards/${task?.boardId}/columns/${task?.columnId}/tasks/${task?.id}`);
        }
      }}
      ref={wrapperRef}
    >
      <InputText<Inputs>
        error={errors.title}
        register={register}
        name="title"
        required="this field is required!"
        defaultValue={task?.title}
        extraClass={styles.input}
      />
    </form>
  );
};

export default TaskUpdate;
