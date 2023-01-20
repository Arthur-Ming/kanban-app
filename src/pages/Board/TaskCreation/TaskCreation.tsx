import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IColumn, ICreationInput } from 'interfaces';
import { RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTask } from 'redux/actions/tasks';
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

  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  useOutside<HTMLDivElement>(wrapperRef, `/boards/${column?.boardId}`);

  return (
    <div ref={wrapperRef}>
      <CreationForm
        onSubmit={create}
        onCancel={onCancel}
        isLoading={isAdding}
        placeholder="bdbdb"
      />
    </div>
  );
};

const mapStateToProps = (state: RootState, { column }: OwnProps) => ({
  isAdding: false,
});

const mapDispatchToProps = (dispatch: AppDispatch, { column }: OwnProps) => ({
  create: (body: ICreationInput) => {
    column && dispatch(createTask({ column, body }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreation);
