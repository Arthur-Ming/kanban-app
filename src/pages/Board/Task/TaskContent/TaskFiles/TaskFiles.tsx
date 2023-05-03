import { FileId } from 'interfaces';
import TaskFile from './TaskFile/TaskFile';
import styles from './index.module.scss';

type Props = {
  fileIds: string[];
};

const TaskFiles = ({ fileIds }: Props) => (
  <div className={styles.box}>
    {fileIds.map((fileId) => (
      <TaskFile key={fileId} file={fileId} />
    ))}
  </div>
);

export default TaskFiles;
