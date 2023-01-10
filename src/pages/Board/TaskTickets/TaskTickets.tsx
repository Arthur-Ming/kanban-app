import TaskTicket from './TaskTicket';
import styles from './index.module.scss';
import { TaskId } from 'interfaces';

type Props = {
  tasks: TaskId[];
};

const TaskTicketList = ({ tasks }: Props) => (
  <ul className={styles.list}>
    {tasks.map((taskId: string) => (
      <TaskTicket key={taskId} taskId={taskId} />
    ))}
  </ul>
);

export default TaskTicketList;
