import { Route, Routes, useNavigate } from 'react-router';
import styles from './index.module.scss';
import TaskUpdate from '../TaskUpdate';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { ITask } from 'interfaces';

type Props = {
  task: ITask;
};

const TaskTitle = ({ task }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.box}>
      <TitleIcon className={styles.icon} />
      <Routes>
        <Route path={`update`} element={<TaskUpdate task={task} />} />
        <Route
          path="/*"
          element={
            <h4 onClick={() => navigate(`update`)} className={styles.title}>
              {task.title}
            </h4>
          }
        />
      </Routes>
    </div>
  );
};

export default TaskTitle;
