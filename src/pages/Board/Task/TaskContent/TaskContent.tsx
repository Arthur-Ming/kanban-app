import InputText from 'components/Forms/InputText';
import { ICreationInput, ITask, ITEXT } from 'interfaces';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import { taskByIdSelector } from 'redux/selectors/tasks';
import { RootState } from 'redux/store';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from './index.module.scss';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';

import TaskSidebar from './TaskSidebar';
import Textarea from 'components/Forms/Textarea';
import TaskUpdateLink from './TaskUpdateLink';

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

type OwnProps = {
  taskId: string;
};
type StateProps = {
  task: ITask;
};

type Props = OwnProps & StateProps;

const TaskContent = ({ task }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  if (!task) return <div>No data!</div>;

  return (
    <form
      onKeyDown={(e) => {
        console.log(e.key);
        if (e.key === 'Escape') {
          navigate(`/boards/${task?.boardId}/columns/${task?.columnId}/tasks/${task?.id}`);
        }
      }}
      onSubmit={handleSubmit((body) => {
        console.log(body);
        /*  update({ task, body });
        navigate(`/boards/${task?.boardId}/columns/${task?.columnId}/tasks/${task?.id}`); */
      })}
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
            required="this field is required!"
            placeholder={
              task?.description || TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription['en']
            }
            extraClass={styles.textarea}
          />
        </TaskUpdateLink>
      </div>
    </form>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  task: taskByIdSelector(state, props),
});

export default connect(mapStateToProps)(TaskContent);
