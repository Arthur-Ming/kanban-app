import InputText from 'components/Forms/InputText';
import { IFetchError, ITask, ITEXT } from 'interfaces';
import { useForm } from 'react-hook-form';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from './index.module.scss';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import Textarea from 'components/Forms/Textarea';
import { useUpdateTaskMutation } from 'redux/api/tasks';
import TaskUpdateLink from '../TaskUpdateLink';
import { toast } from 'react-toastify';

const TEXT_TASK_CONTENT_DESCRIPTION: ITEXT = {
  title: {
    en: 'Description',
    ru: 'Описание',
  },
  defaultDescription: {
    en: 'Add a more detailed description...',
    ru: 'Добавить более подробное описание...',
  },
};

type Inputs = {
  title: string;
  description?: string;
};

type Props = {
  task: ITask;
};

const TaskInfo = ({ task }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [update, { isError, error, reset: resetMutation }] = useUpdateTaskMutation();

  const onCancel = () =>
    navigate(`/boards/${task?.boardId}/columns/${task?.columnId}/tasks/${task.id}`);
  const onSubmit = (body: Inputs) => {
    update({ task, body });
    onCancel();
  };
  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to update task', {
      toastId: errorStatus,
    });
    resetMutation();
  }

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          reset();
          onCancel();
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className={styles.box}
    >
      <div className={styles.titleBox}>
        <TitleIcon className={styles.icon} />
        <TaskUpdateLink title={task.title} extraClass={styles.title}>
          <InputText<Inputs>
            error={errors.title}
            register={register}
            name="title"
            required="this field is required!"
            defaultValue={task?.title}
            extraClass={styles.input}
          />
        </TaskUpdateLink>
      </div>
      <div className={styles.descriptionBox}>
        <DescriptionIcon className={styles.icon} />
        <TaskUpdateLink
          title={task?.description || TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription['en']}
          extraClass={styles.description}
        >
          <Textarea
            error={errors.description}
            register={register}
            name="description"
            defaultValue={task?.description}
            placeholder={
              task?.description || TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription['en']
            }
            extraClass={styles.textarea}
          />
        </TaskUpdateLink>
      </div>
      <div className={styles.buttons}>
        <Routes>
          <Route
            path="/*"
            element={
              <input
                type="button"
                className={styles.buttonSubmit}
                value="Edit"
                onClick={() => navigate(`update`)}
              />
            }
          />
          <Route
            path={`update`}
            element={
              <>
                <input
                  type="button"
                  className={styles.buttonCancel}
                  value="Cancel"
                  onClick={() => {
                    reset();
                    onCancel();
                  }}
                />
                <input type="submit" className={styles.button} value="Submit" />
              </>
            }
          />
        </Routes>
      </div>
    </form>
  );
};

export default TaskInfo;
