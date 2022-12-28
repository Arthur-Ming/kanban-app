import { useParams } from 'react-router-dom';
import TaskCreationForm from './TaskCreationForm';

const TaskCreation = () => {
  const { boardId, columnId } = useParams();

  return (
    <div> {boardId && columnId && <TaskCreationForm boardId={boardId} columnId={columnId} />} </div>
  );
};

export default TaskCreation;
