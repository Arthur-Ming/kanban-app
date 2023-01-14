import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IBoard, ICreateColumnBody, ICreationInput, IRequestState } from 'interfaces';
import { RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createColumn } from 'redux/actions/columns';
import { RootState } from 'redux/reducer';
import { columnsAddingState } from 'redux/selectors/columns';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

type StateProps = {
  addingState: IRequestState;
};

type DispatchProps = {
  create: (body: ICreationInput) => void;
};

interface OwnProps {
  board?: IBoard;
}

type Props = OwnProps & StateProps & DispatchProps;

const ColumnCreation = ({ board, create, addingState }: Props) => {
  const navigate = useNavigate();
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  useOutside<HTMLDivElement>(wrapperRef, `/boards/${board?.id}`);

  const onCancel = () => {
    navigate(`/boards/${board?.id}`);
  };

  return (
    <div className={styles.box} ref={wrapperRef}>
      <CreationForm
        onSubmit={create}
        onCancel={onCancel}
        isLoading={addingState.loading}
        placeholder="dbfdbdfnfngf"
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  addingState: columnsAddingState(state),
});

const mapDispatchToProps = (dispatch: AppDispatch, { board }: OwnProps) => ({
  create: (body: ICreateColumnBody) => {
    board && dispatch(createColumn({ board, body }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnCreation);
