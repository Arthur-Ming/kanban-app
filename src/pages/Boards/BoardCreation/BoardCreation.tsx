import CreationForm from 'components/CreationForm';
import { ICreationInput } from 'interfaces';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createBoard } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import { boardsAddingSelector } from 'redux/selectors/boards';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  create: (body: ICreationInput) => void;
};

type Props = StateProps & DispatchProps;

const BoardCreation = ({ create, isLoading }: Props) => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`/boards`);
  };

  return (
    <div className={styles.box}>
      <CreationForm
        onSubmit={create}
        onCancel={onCancel}
        isLoading={isLoading}
        placeholder="bdbdb"
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: boardsAddingSelector(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  create: (body: ICreationInput) => dispatch(createBoard(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardCreation);
