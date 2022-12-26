import BoardTickets from './BoardTickets';
import { connect } from 'react-redux';
import { getBoards } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import { boardIdsSelector } from 'redux/selectors/boards';
import { useEffect } from 'react';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import BoardCreationTicket from './BoardCreationTicket';
import { requestFetchingSelector } from 'redux/selectors/request';
import Loader from 'components/Loader';

interface DispatchProps {
  getBoards: () => void;
}

interface StateProps {
  isBoardsloading: boolean;
  /*   isBoardsloaded: boolean; */
  boardIds: string[];
}

type Props = DispatchProps & StateProps;

const Boards = ({ getBoards, boardIds, isBoardsloading }: Props) => {
  useEffect(() => {
    getBoards();
  }, [getBoards]);
  console.log('Boards');
  if (isBoardsloading) return <Loader />;

  return (
    <div className={styles.box}>
      <BoardTickets boardIds={boardIds} />
      <div className={styles.create}>
        <Routes>
          <Route path="create-board" element={<BoardCreation />} />
          <Route index element={<BoardCreationTicket />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardsloading: requestFetchingSelector(state, 'boards'),
  //isBoardsloaded: boardsLoadedSelector(state), */
  boardIds: boardIdsSelector(state),
});

const mapDispatchToProps = {
  getBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
