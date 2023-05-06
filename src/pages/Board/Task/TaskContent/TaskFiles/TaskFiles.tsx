import { FileId, ITask } from 'interfaces';
import TaskFile from './TaskFile/TaskFile';
import styles from './index.module.scss';

type Props = {
  files: string[];
  task: ITask;
};

const TaskFiles = ({ files, task }: Props) => (
  <div className={styles.box}>
    {files.map((file) => (
      <TaskFile key={file} file={file} task={task} />
    ))}
  </div>
);

export default TaskFiles;
