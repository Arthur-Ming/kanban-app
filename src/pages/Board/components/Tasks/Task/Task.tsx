import { ITask } from 'interfaces';
import { routes } from 'utils/routes';
import RemoveTask from './RemoveTask';
import styles from './task.module.scss';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { taskByIdSelector } from 'redux/selectors';
import { RootState } from 'redux/reducer';
import TaskContent from '../../TaskContent';

interface StateProps {
  task: ITask;
}

interface OwnProps {
  columnId: string;
  taskId: string;
}

type TProps = StateProps & OwnProps;

const Task = ({ task, columnId, taskId }: TProps) => {
  const { taskId: id = '' } = useParams();
  return (
    <div data-tasks-grab-handle data-task-id={taskId} className={styles.task}>
      <Link to={routes.tasks.content.absolute(columnId, taskId)} className={styles.link}>
        {task?.title}
      </Link>
      <RemoveTask taskId={taskId} columnId={columnId} />
      <Routes>
        {taskId === id && task && (
          <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
        )}
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: RootState, params: OwnProps) => ({
  task: taskByIdSelector(state, params),
});

export default connect(mapStateToProps)(Task);
