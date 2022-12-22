import TaskTicket from './TaskTicket';
import styles from './index.module.scss';

type Props = {
  taskIds: string[];
};

const TaskTicketList = ({ taskIds }: Props) => (
  <ul className={styles.list}>
    {taskIds.map((taskId: string) => (
      <TaskTicket key={taskId} taskId={taskId} />
    ))}
  </ul>
);

export default TaskTicketList;
