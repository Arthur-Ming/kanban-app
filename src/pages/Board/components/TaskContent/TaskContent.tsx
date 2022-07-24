import TaskContentHeader from './TaskContentHeader';
import TaskContentSidebar from './TaskContentSidebar';
import TaskContentDescription from './TaskContentDescription';
import styles from './styles.module.scss';
import NotFound from 'pages/NotFound';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { IBoard, IColumn, ITask } from 'interfaces';
import { columnByIdSelector } from 'redux/selectors';
import { connect, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';

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
            <TaskContentDescription taskId={taskId} />
          </div>
          <TaskContentSidebar />
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
