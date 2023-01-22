import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import TaskContent from './TaskContent';
import styles from './index.module.scss';
import { IoMdClose as CloseIcon } from 'react-icons/io';

const Task = () => {
  const { boardId = '', taskId = '' } = useParams();

  const navigate = useNavigate();

  const onCloseClick = () => navigate(`/boards/${boardId}`);

  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={onCloseClick}>
          <CloseIcon className={styles['close-icon']} />
        </div>
        <TaskContent taskId={taskId} />
      </div>
    </Modal>
  );
};

export default Task;
