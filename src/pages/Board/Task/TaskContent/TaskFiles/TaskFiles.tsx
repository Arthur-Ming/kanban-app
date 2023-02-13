import { FileId } from 'interfaces';
import TaskFile from './TaskFile/TaskFile';
import styles from './index.module.scss';

type Props = {
  fileIds: FileId[];
};

const TaskFiles = ({ fileIds }: Props) => (
  <div className={styles.box}>
    {fileIds.map((fileId) => (
      <TaskFile key={fileId} fileId={fileId} />
    ))}
  </div>
);

export default TaskFiles;
