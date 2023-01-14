import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { boardIdsSelector } from 'redux/selectors/boards';
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

const mapStateToProps = (state: RootState) => ({
  boardIds: boardIdsSelector(state),
});

export default connect(mapStateToProps)(BoardsList);
