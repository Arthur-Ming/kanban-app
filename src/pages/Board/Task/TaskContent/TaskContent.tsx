import { ITask } from 'interfaces';
import { connect } from 'react-redux';
import { taskByIdSelector } from 'redux/selectors/tasks';
import { RootState } from 'redux/store';
import styles from './index.module.scss';
import TaskDescription from './TaskDescription';
import TaskContentHeader from './TaskHeader';
import TaskSidebar from './TaskSidebar';

type OwnProps = {
  taskId: string;
};
type StateProps = {
  task: ITask;
};

type Props = OwnProps & StateProps;

const TaskContent = ({ task }: Props) => {
  if (!task) return <div>No data!</div>;
  return (
    <div className={styles.box}>
      <TaskContentHeader task={task} />
      <div className={styles.main}>
        <div className={styles.body}>
          <TaskDescription task={task} />
        </div>
        <TaskSidebar />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  task: taskByIdSelector(state, props),
});

export default connect(mapStateToProps)(TaskContent);
