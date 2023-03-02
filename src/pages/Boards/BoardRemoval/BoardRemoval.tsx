import Removal from 'components/Removal';
import { IBoard } from 'interfaces';
import { useDeleteBoardMutation } from 'redux/api/boards';

type OwnProps = {
  board: IBoard;
};

type Props = OwnProps;

const BoardRemoval = ({ board }: Props) => {
  const [deleteBoard, { isError, error }] = useDeleteBoardMutation();
  if (isError) throw error;

  return <Removal onConfirm={() => deleteBoard(board)} />;
};

export default BoardRemoval;
