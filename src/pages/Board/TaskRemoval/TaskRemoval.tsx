import Removal from 'components/Removal';
import { connect } from 'react-redux';
import { removeTask } from 'redux/actions/tasks';
import { AppDispatch } from 'redux/store';

type OwnProps = {
  boardId: string;
  columnId: string;
  taskId: string;
};

type DispatchProps = {
  remove: () => void;
};

type Props = OwnProps & DispatchProps;

const TaskRemoval = ({ remove }: Props) => {
  return <Removal onConfirm={remove} />;
};

const mapDispatchToProps = (dispatch: AppDispatch, { boardId, columnId, taskId }: OwnProps) => ({
  remove: () => dispatch(removeTask(boardId, columnId, taskId)),
});

export default connect(null, mapDispatchToProps)(TaskRemoval);
