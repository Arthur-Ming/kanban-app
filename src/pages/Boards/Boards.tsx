import BoardTickets from './BoardTickets';
import { connect } from 'react-redux';
import { getBoards } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import {
  boardsLoadingSelector,
  boardsLoadedSelector,
  boardIdsSelector,
} from 'redux/selectors/boards';
import { useEffect } from 'react';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import BoardCreationTicket from './BoardCreationTicket';

interface DispatchProps {
  getBoards: () => void;
}

interface StateProps {
  isBoardsloading: boolean;
  isBoardsloaded: boolean;
  boardIds: string[];
}

type Props = DispatchProps & StateProps;

const Boards = ({ getBoards, boardIds }: Props) => {
  useEffect(() => {
    getBoards();
  }, [getBoards]);

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
  isBoardsloading: boardsLoadingSelector(state),
  isBoardsloaded: boardsLoadedSelector(state),
  boardIds: boardIdsSelector(state),
});

const mapDispatchToProps = {
  getBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
