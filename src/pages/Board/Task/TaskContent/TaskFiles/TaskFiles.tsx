import { FileId } from 'interfaces';
import TaskFile from './TaskFile/TaskFile';

type Props = {
  fileIds: FileId[];
};

const TaskFiles = ({ fileIds }: Props) => {
  return (
    <div>
      {fileIds.map((fileId) => (
        <TaskFile key={fileId} fileId={fileId} />
      ))}
    </div>
  );
};

export default TaskFiles;
