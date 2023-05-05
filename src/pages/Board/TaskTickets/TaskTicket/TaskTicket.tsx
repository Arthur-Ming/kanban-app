import { TaskId } from 'interfaces';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import TaskRemoval from 'pages/Board/TaskRemoval';
import { useLoadBoardByIdQuery } from 'redux/api/boards';
import { memo } from 'react';

type Props = {
  taskId: TaskId;
  boardId: string;
};

const TaskTicket = ({ taskId, boardId }: Props) => {
  const { task } = useLoadBoardByIdQuery(boardId, {
    selectFromResult: ({ data }) => ({
      task: data && data.tasks && data.tasks[taskId],
    }),
  });

  if (!task) return <div>!!!!</div>;
  return (
    <div className={styles.box}>
      <Link to={`columns/${task.columnId}/tasks/${task.id}`} className={styles.link}>
        {task?.title}
      </Link>
      <TaskRemoval task={task} />
    </div>
  );
};

export default memo(TaskTicket);
