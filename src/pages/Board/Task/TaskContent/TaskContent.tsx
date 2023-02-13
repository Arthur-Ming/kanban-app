import ImageUploader from 'components/Forms/ImageUploader';
import TaskAttachments from './TaskAttachments';
import TaskInfo from './TaskInfo';
import { ITask } from 'interfaces';
import { connect } from 'react-redux';
import { taskByIdSelector } from 'redux/selectors/tasks';
import { RootState } from 'redux/store';
import styles from './index.module.scss';

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
      <TaskInfo task={task} />
      <TaskAttachments task={task} />
      <ImageUploader task={task} />
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  task: taskByIdSelector(state, props),
});

export default connect(mapStateToProps)(TaskContent);
