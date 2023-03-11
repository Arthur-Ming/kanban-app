import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IFetchError } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCreateBoardMutation } from 'redux/api/boards';
import styles from './index.module.scss';

const BoardCreation = () => {
  const navigate = useNavigate();
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  useOutside<HTMLDivElement>(wrapperRef, `/boards`);
  const [create, { isLoading, isError, error }] = useCreateBoardMutation();

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to create board', {
      toastId: errorStatus,
    });
  }

  const onCancel = () => {
    navigate(`/boards`);
  };

  return (
    <div className={styles.box} ref={wrapperRef}>
      <CreationForm
        onSubmit={create}
        onCancel={onCancel}
        isLoading={isLoading}
        placeholder="Создать доску"
      />
    </div>
  );
};

export default BoardCreation;
