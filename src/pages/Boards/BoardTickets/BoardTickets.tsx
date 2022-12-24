import BoardTicket from './BoardTicket';

interface Props {
  boardIds: string[];
}

const BoardsList = ({ boardIds }: Props) => (
  <>
    {boardIds.map((boardId) => (
      <BoardTicket boardId={boardId} key={boardId} />
    ))}
  </>
);

export default BoardsList;
