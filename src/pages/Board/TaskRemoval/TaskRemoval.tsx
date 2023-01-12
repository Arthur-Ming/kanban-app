import Removal from 'components/Removal';
import { ITask } from 'interfaces';
import { connect } from 'react-redux';
import { deleteTask } from 'redux/actions/tasks';
import { AppDispatch } from 'redux/store';

type OwnProps = {
  task: ITask;
};

type DispatchProps = {
  remove: () => void;
};

type Props = OwnProps & DispatchProps;

const TaskRemoval = ({ remove }: Props) => {
  return <Removal onConfirm={remove} />;
};

const mapDispatchToProps = (dispatch: AppDispatch, { task }: OwnProps) => ({
  remove: () => dispatch(deleteTask(task)),
});

export default connect(null, mapDispatchToProps)(TaskRemoval);
