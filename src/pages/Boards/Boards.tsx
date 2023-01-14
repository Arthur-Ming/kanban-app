import BoardTickets from './BoardTickets';
import { connect } from 'react-redux';
import { loadBoards } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import { boardsFetchingState } from 'redux/selectors/boards';
import { useEffect } from 'react';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import Loader from 'components/Loader';
import CreationTicket from 'components/CreationTicket';
import { IRequestState } from 'interfaces';

interface DispatchProps {
  loadBoards: () => void;
}

interface StateProps {
  loadingState: IRequestState;
}

type Props = DispatchProps & StateProps;

const Boards = ({ loadBoards, loadingState }: Props) => {
  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  if (loadingState.failed) return <div>!!!!</div>;
  if (loadingState.idle || loadingState.loading) return <Loader />;

  return (
    <div className={styles.box}>
      <BoardTickets />
      <div className={styles.create}>
        <Routes>
          <Route path="/*" element={<CreationTicket label="создать доску" path="create" />} />
          <Route path="create" element={<BoardCreation />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loadingState: boardsFetchingState(state),
});

const mapDispatchToProps = {
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
