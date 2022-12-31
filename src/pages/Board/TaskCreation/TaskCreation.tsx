import CreationForm from 'components/CreationForm';
import { ICreationInput } from 'interfaces';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTask } from 'redux/actions/tasks';
import { AppDispatch } from 'redux/store';

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  create: (body: ICreationInput) => void;
};

interface OwnProps {
  boardId?: string;
  columnId?: string;
}

type Props = OwnProps & StateProps & DispatchProps;

const TaskCreation = ({ boardId, create, isLoading }: Props) => {
  const navigate = useNavigate();
  const onCancel = () => {
    boardId && navigate(`/boards/${boardId}`);
  };

  return (
    <CreationForm onSubmit={create} onCancel={onCancel} isLoading={isLoading} placeholder="bdbdb" />
  );
};

const mapStateToProps = () => ({
  isLoading: false,
});

const mapDispatchToProps = (dispatch: AppDispatch, { boardId, columnId }: OwnProps) => ({
  create: (body: ICreationInput) => {
    boardId && columnId && dispatch(createTask(boardId, columnId, body));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreation);
