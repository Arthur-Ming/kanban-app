import Removal from 'components/Removal';
import { IBoard, IFetchError } from 'interfaces';
import { useDeleteBoardMutation } from 'redux/api/boards';
import { toast } from 'react-toastify';
import styles from './index.module.scss';

type OwnProps = {
  board: IBoard;
};

type Props = OwnProps;

const BoardRemoval = ({ board }: Props) => {
  const [remove, { isLoading, isError, error }] = useDeleteBoardMutation();
  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to remove board', {
      toastId: errorStatus,
    });
  }

  return <Removal onConfirm={() => remove(board)} disabled={isLoading} iconClass={styles.icon} />;
};

export default BoardRemoval;
