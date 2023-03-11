import Removal from 'components/Removal';
import { IBoard, IFetchError } from 'interfaces';
import { useDeleteBoardMutation } from 'redux/api/boards';
import { toast } from 'react-toastify';

type OwnProps = {
  board: IBoard;
};

type Props = OwnProps;

const BoardRemoval = ({ board }: Props) => {
  const [deleteBoard, { isLoading, isError, error }] = useDeleteBoardMutation();
  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to remove board', {
      toastId: errorStatus,
    });
  }

  return <Removal onConfirm={() => deleteBoard(board)} disabled={isLoading} />;
};

export default BoardRemoval;
