import ImageUploader from 'components/Forms/ImageUploader';
import TaskAttachments from './TaskAttachments';
import TaskInfo from './TaskInfo';
import { ITask } from 'interfaces';
import styles from './index.module.scss';

type Props = {
  taskId: string;
};

const TaskContent = ({ taskId }: Props) => {
  /* if (!task) return <div>No data!</div>; */

  return (
    <div className={styles.box}>
      {/*  <TaskInfo task={task} />
      <TaskAttachments task={task} />
      <ImageUploader task={task} /> */}
    </div>
  );
};

export default TaskContent;
