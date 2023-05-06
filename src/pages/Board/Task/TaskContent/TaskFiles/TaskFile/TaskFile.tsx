import { FileId, IFile, ITask } from 'interfaces';
import { connect } from 'react-redux';
import { useDeleteFileMutation } from 'redux/api/files';
import { RootState } from 'redux/reducer';
import buildPathToFile from 'utils/buildPathToFile';
import styles from './index.module.scss';

type OwnProps = {
  fileId: FileId;
};

type StateProps = {
  file: IFile;
};

type Props = {
  file: string;
  task: ITask;
};

const TaskFile = ({ file, task }: Props) => {
  const [remove] = useDeleteFileMutation();
  return (
    <div>
      <a
        href={buildPathToFile(file)}
        target="_blank"
        className={styles.img}
        style={{ backgroundImage: `url(${buildPathToFile(file)})` }}
        rel="noreferrer"
      ></a>
      <button onClick={() => remove({ file, task })}>delete</button>
    </div>
  );
};

export default TaskFile;
