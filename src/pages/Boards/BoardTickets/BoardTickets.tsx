import { IBoard } from 'interfaces';
import BoardTicket from './BoardTicket';

interface Props {
  boards: IBoard[];
}

const BoardTickets = ({ boards }: Props) => (
  <>
    {boards.map((board) => (
      <BoardTicket board={board} key={board.id} />
    ))}
  </>
);

export default BoardTickets;
