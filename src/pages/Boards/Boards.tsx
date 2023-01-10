import BoardTickets from './BoardTickets';
import { connect } from 'react-redux';
import { loadBoards } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import { boardIdsSelector, boardsLoadingSelector } from 'redux/selectors/boards';
import { useEffect } from 'react';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import Loader from 'components/Loader';
import CreationTicket from 'components/CreationTicket';

interface DispatchProps {
  loadBoards: () => void;
}

interface StateProps {
  isBoardsloading: boolean;
  boardIds: string[];
}

type Props = DispatchProps & StateProps;

const Boards = ({ loadBoards, boardIds, isBoardsloading }: Props) => {
  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  if (isBoardsloading) return <Loader />;

  return (
    <div className={styles.box}>
      <BoardTickets boardIds={boardIds} />
      <div className={styles.create}>
        <Routes>
          <Route path="create" element={<BoardCreation />} />
          <Route path="/*" element={<CreationTicket label="создать доску" path="create" />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardsloading: boardsLoadingSelector(state),
  boardIds: boardIdsSelector(state),
});

const mapDispatchToProps = {
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
