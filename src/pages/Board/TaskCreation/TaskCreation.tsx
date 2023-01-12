import CreationForm from 'components/CreationForm';
import { IColumn, ICreationInput } from 'interfaces';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTask } from 'redux/actions/tasks';
import { tasksAddingSelector } from 'redux/selectors/tasks';
import { AppDispatch, RootState } from 'redux/store';

type StateProps = {
  isAdding: boolean;
};

type DispatchProps = {
  create: (body: ICreationInput) => void;
};

interface OwnProps {
  column?: IColumn;
}

type Props = OwnProps & StateProps & DispatchProps;

const TaskCreation = ({ column, create, isAdding }: Props) => {
  const navigate = useNavigate();
  const onCancel = () => {
    column && navigate(`/boards/${column.boardId}`);
  };

  return (
    <CreationForm onSubmit={create} onCancel={onCancel} isLoading={isAdding} placeholder="bdbdb" />
  );
};

const mapStateToProps = (state: RootState, { column }: OwnProps) => ({
  isAdding: column ? tasksAddingSelector(state, { column }) : false,
});

const mapDispatchToProps = (dispatch: AppDispatch, { column }: OwnProps) => ({
  create: (body: ICreationInput) => {
    column && dispatch(createTask({ column, body }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreation);
