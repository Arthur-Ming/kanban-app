import TaskHeader from './TaskHeader';
import TaskSidebar from './TaskSidebar';
import TaskDescription from './TaskDescription';
import styles from './styles.module.scss';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';

const TaskContent = () => {
  const { boardId, columnId = '', taskId = '' } = useParams();

  console.log(boardId);
  console.log(columnId);
  console.log(taskId);

  const navigate = useNavigate();

  const onCloseClick = () => navigate(`/boards/${boardId}`);

  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={`${styles.wrapper} ${styles.open}`}>
        {/*  <TaskContentHeader columnId={columnId} taskId={taskId} onCloseClick={onCloseClick} /> */}
        <div className={styles.main}>
          <div className={styles.body}>
            <TaskDescription taskId={taskId} />
          </div>
          <TaskSidebar />
        </div>
      </div>
    </Modal>
  );
};
/* 
const mapStateToProps = (state: RootState, params: IProps) => ({
  column: columnSelector(state, params),
});

export default connect(mapStateToProps, null)(TaskContent);
 */

export default TaskContent;
