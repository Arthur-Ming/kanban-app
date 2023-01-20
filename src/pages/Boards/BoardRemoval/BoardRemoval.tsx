import Removal from 'components/Removal';
import { IBoard } from 'interfaces';
import { useDeleteBoardMutation } from 'redux/api';

type OwnProps = {
  board: IBoard;
};

type Props = OwnProps;

const BoardRemoval = ({ board }: Props) => {
  const [deleteBoard, response] = useDeleteBoardMutation();

  return <Removal onConfirm={() => deleteBoard(board)} />;
};

export default BoardRemoval;
