import CreationForm from 'components/CreationForm';
import { ICreationInput, IRequestState } from 'interfaces';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createBoard } from 'redux/actions/boards';
import { useCreateBoardMutation } from 'redux/api';
import { RootState } from 'redux/reducer';
import { boardsAddingState } from 'redux/selectors/boards';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

const BoardCreation = () => {
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateBoardMutation();

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

export default BoardCreation;
