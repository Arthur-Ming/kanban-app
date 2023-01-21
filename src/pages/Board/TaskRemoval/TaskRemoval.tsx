import Removal from 'components/Removal';
import { ITask } from 'interfaces';
import { useDeleteTaskMutation } from 'redux/api/tasks';

type OwnProps = {
  task: ITask;
};

type Props = OwnProps;

const TaskRemoval = ({ task }: Props) => {
  const [deleteTask, rest] = useDeleteTaskMutation();

  return <Removal onConfirm={() => deleteTask(task)} />;
};

export default TaskRemoval;
