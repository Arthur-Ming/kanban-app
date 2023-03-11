import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IBoard, ICreateColumnBody, IFetchError } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCreateColumnMutation } from 'redux/api/columns';
import styles from './index.module.scss';

interface OwnProps {
  board?: IBoard;
}

type Props = OwnProps;

const ColumnCreation = ({ board }: Props) => {
  const navigate = useNavigate();
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  useOutside<HTMLDivElement>(wrapperRef, `/boards/${board?.id}`);
  const [create, { isLoading, isError, error }] = useCreateColumnMutation();

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to create column', {
      toastId: errorStatus,
    });
  }

  const onCancel = () => {
    navigate(`/boards/${board?.id}`);
  };

  return (
    <div className={styles.box} ref={wrapperRef}>
      <CreationForm
        onSubmit={(body: ICreateColumnBody) => create({ board, body })}
        onCancel={onCancel}
        isLoading={isLoading}
        placeholder="dbfdbdfnfngf"
      />
    </div>
  );
};

export default ColumnCreation;
