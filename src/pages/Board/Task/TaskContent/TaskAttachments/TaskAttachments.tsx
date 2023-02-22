import { ITask } from 'interfaces';
import { FiPaperclip as ClipIcon } from 'react-icons/fi';
import TaskFiles from '../TaskFiles';
import styles from './index.module.scss';

type Props = {
  task: ITask;
};

const TaskAttachments = ({ task }: Props) => (
  <div className={styles.box}>
    <div className={styles.titleBox}>
      <ClipIcon className={styles.clip} />
      <h4 className={styles.title}>Attachments</h4>
    </div>
    <TaskFiles fileIds={task.files} />
  </div>
);

export default TaskAttachments;
