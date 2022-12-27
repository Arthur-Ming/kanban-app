import BoardTickets from './BoardTickets';
import { connect } from 'react-redux';
import { loadBoards } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import { boardIdsSelector } from 'redux/selectors/boards';
import { useEffect } from 'react';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import BoardCreationTicket from './BoardCreationTicket';
import { requestFetchingSelector } from 'redux/selectors/requests';
import Loader from 'components/Loader';
import { baseRoutes, routes } from 'utils/routes';

interface DispatchProps {
  loadBoards: () => void;
}

interface StateProps {
  isBoardsloading: boolean;
  /*   isBoardsloaded: boolean; */
  boardIds: string[];
}

type Props = DispatchProps & StateProps;

const Boards = ({ loadBoards, boardIds, isBoardsloading }: Props) => {
  useEffect(() => {
    loadBoards();
  }, [loadBoards]);
  console.log('Boards');
  if (isBoardsloading) return <Loader />;

  return (
    <div className={styles.box}>
      <BoardTickets boardIds={boardIds} />
      <div className={styles.create}>
        <Routes>
          <Route path="create" element={<BoardCreation />} />
          <Route index element={<BoardCreationTicket />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardsloading: requestFetchingSelector(state, baseRoutes.boards.base.relative),
  //isBoardsloaded: boardsLoadedSelector(state), */
  boardIds: boardIdsSelector(state),
});

const mapDispatchToProps = {
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
