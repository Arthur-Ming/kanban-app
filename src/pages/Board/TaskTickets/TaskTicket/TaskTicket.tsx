import { ITask, TaskId } from 'interfaces';
import { routes } from 'utils/routes';
import RemoveTask from './RemoveTask';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { taskByIdSelector } from 'redux/selectors/tasks';
import { RootState } from 'redux/reducer';

type StateProps = {
  task: ITask;
};

type OwnProps = {
  taskId: TaskId;
};

type Props = StateProps & OwnProps;

const TaskTicket = ({ task }: Props) => (
  <li className={styles.task}>
    {/*    <Link to={routes.tasks.content.absolute(task.columnId, task.id)} className={styles.link}>
      {task?.title}
    </Link> */}
    <Link to={routes.tasks.content(task.columnId, task.id)} className={styles.link}>
      {task?.title}
    </Link>
    {
      //TaskTicketContent
      //TaskRemover
    }
    {/*  <RemoveTask task={task} /> */}
  </li>
);

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  task: taskByIdSelector(state, props),
});

export default connect(mapStateToProps)(TaskTicket);
