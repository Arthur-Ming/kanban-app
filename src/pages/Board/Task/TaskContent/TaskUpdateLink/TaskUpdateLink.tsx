import { ITask } from 'interfaces';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import styles from '../index.module.scss';

type Props = {
  task: ITask;
};

const TaskUpdateLink = ({ task }: Props) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`update`)}>
      <TitleIcon />
      <h4 className={styles.title}>{task.title}</h4>
    </div>
  );
};

export default TaskUpdateLink;
