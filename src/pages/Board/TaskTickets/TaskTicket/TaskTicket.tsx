import { ITask, TaskId } from 'interfaces';
import { routes } from 'utils/routes';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { taskByIdSelector, tasksDeletingSelector } from 'redux/selectors/tasks';
import { RootState } from 'redux/reducer';
import TaskRemoval from 'pages/Board/TaskRemoval';

type StateProps = {
  task: ITask;
  isDeleting: boolean;
};

type OwnProps = {
  taskId: TaskId;
};

type Props = StateProps & OwnProps;

const TaskTicket = ({ task, isDeleting }: Props) => (
  <li className={styles.task}>
    {isDeleting && <div>Deleting</div>}
    {!isDeleting && (
      <>
        <Link to={routes.tasks.content(task.columnId, task.id)} className={styles.link}>
          {task?.title}
        </Link>
        <TaskRemoval task={task} />
      </>
    )}
  </li>
);

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  task: taskByIdSelector(state, props),
  isDeleting: tasksDeletingSelector(state, props),
});

export default connect(mapStateToProps)(TaskTicket);
