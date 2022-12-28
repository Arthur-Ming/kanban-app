import TaskTicket from './TaskTicket';
import styles from './index.module.scss';
import { TaskId } from 'interfaces';

type Props = {
  taskIds: TaskId[];
};

const TaskTicketList = ({ taskIds }: Props) => (
  <ul className={styles.list}>
    {taskIds.map((taskId: string) => (
      <TaskTicket key={taskId} taskId={taskId} />
    ))}
  </ul>
);

export default TaskTicketList;
