import CreationForm from 'components/CreationForm';
import { useNavigate } from 'react-router';
import { useCreateBoardMutation } from 'redux/api/boards';
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
