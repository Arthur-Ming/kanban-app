import CreationForm from 'components/CreationForm';
import { ICreateColumnBody, ICreationInput } from 'interfaces';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createColumn } from 'redux/actions/columns';
import { RootState } from 'redux/reducer';
import { columnsAddingSelector } from 'redux/selectors/columns';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

type StateProps = {
  isAdding: boolean;
};

type DispatchProps = {
  create: (body: ICreationInput) => void;
};

interface OwnProps {
  boardId?: string;
}

type Props = OwnProps & StateProps & DispatchProps;

const ColumnCreation = ({ boardId, create, isAdding }: Props) => {
  const navigate = useNavigate();
  const onCancel = () => {
    boardId && navigate(`/boards/${boardId}`);
  };

  return (
    <div className={styles.box}>
      <CreationForm
        onSubmit={create}
        onCancel={onCancel}
        isLoading={isAdding}
        placeholder="dbfdbdfnfngf"
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAdding: columnsAddingSelector(state),
});

const mapDispatchToProps = (dispatch: AppDispatch, { boardId }: OwnProps) => ({
  create: (body: ICreateColumnBody) => {
    boardId && dispatch(createColumn(boardId, body));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnCreation);
