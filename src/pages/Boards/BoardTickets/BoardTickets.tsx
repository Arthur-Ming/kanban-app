import { IBoard } from 'interfaces';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { boardsListSelector } from 'redux/selectors/boards';
import BoardTicket from './BoardTicket';

interface Props {
  boards: IBoard[];
}

const BoardsList = ({ boards }: Props) => (
  <>
    {boards.map((board) => (
      <BoardTicket board={board} key={board.id} />
    ))}
  </>
);

const mapStateToProps = (state: RootState) => ({
  boards: boardsListSelector(state),
});

export default connect(mapStateToProps)(BoardsList);
