import { IBoard } from 'interfaces';
import BoardCard from './BoardCard';

interface Props {
  boards: IBoard[];
}

const BoardsList = ({ boards }: Props) => (
  <>
    {boards.map(({ title, id, description }) => (
      <BoardCard id={id} description={description} title={title} key={id} />
    ))}
  </>
);

export default BoardsList;
