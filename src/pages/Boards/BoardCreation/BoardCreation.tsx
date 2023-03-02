import CreationForm from 'components/CreationForm';
import { IFetchError } from 'interfaces';

import { ErrorBoundaryProps, withErrorBoundary } from 'react-error-boundary';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCreateBoardMutation } from 'redux/api/boards';
import styles from './index.module.scss';

const BoardCreation = () => {
  const navigate = useNavigate();
  const [create, { isLoading, isError, error }] = useCreateBoardMutation();
  if (isError) throw error;

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

export default withErrorBoundary(BoardCreation, {
  fallbackRender: ({ error, resetErrorBoundary }) => {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }

    toast.error('failed to create board', {
      toastId: errorStatus,
    });
    return <BoardCreation />;
  },
});
/* 
export default BoardCreation; */
