import ImageUploader from 'components/Forms/ImageUploader';
import TaskAttachments from './TaskAttachments';
import TaskInfo from './TaskInfo';
import { ITask } from 'interfaces';
import styles from './index.module.scss';
import { useLoadBoardByIdQuery } from 'redux/api/boards';

type Props = {
  taskId: string;
  boardId: string;
};

const TaskContent = ({ boardId, taskId }: Props) => {
  const { task } = useLoadBoardByIdQuery(boardId, {
    selectFromResult: ({ data }) => ({
      task: data?.tasks[taskId],
    }),
  });
  if (!task) return <div>No data!</div>;

  return (
    <div className={styles.box}>
      <TaskInfo task={task} />
      <TaskAttachments task={task} />
      <ImageUploader task={task} />
    </div>
  );
};

export default TaskContent;
