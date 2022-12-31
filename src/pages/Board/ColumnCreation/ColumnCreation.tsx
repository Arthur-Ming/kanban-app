import CreationForm from 'components/CreationForm';
import { ICreateColumnBody, ICreationInput } from 'interfaces';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createColumn } from 'redux/actions/columns';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  create: (body: ICreationInput) => void;
};

interface OwnProps {
  boardId?: string;
}

type Props = OwnProps & StateProps & DispatchProps;

const ColumnCreation = ({ boardId, create, isLoading }: Props) => {
  const navigate = useNavigate();
  const onCancel = () => {
    boardId && navigate(`/boards/${boardId}`);
  };

  return (
    <div className={styles.box}>
      <CreationForm
        onSubmit={create}
        onCancel={onCancel}
        isLoading={isLoading}
        placeholder="dbfdbdfnfngf"
      />
    </div>
  );
};

const mapStateToProps = () => ({
  isLoading: false,
});

const mapDispatchToProps = (dispatch: AppDispatch, { boardId }: OwnProps) => ({
  create: (body: ICreateColumnBody) => {
    boardId && dispatch(createColumn(boardId, body));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnCreation);
