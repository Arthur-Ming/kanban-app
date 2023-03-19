import BoardTickets from './BoardTickets';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import Loader from 'components/Loader';
import CreationTicket from 'components/CreationTicket';
import { useLoadBoardsQuery } from 'redux/api/boards';
import { withErrorBoundary } from 'react-error-boundary';
import { routes } from 'utils/routes';
import PageErrorFallback from 'components/PageErrorFallback';

const Boards = () => {
  const { isLoading, isError, error } = useLoadBoardsQuery(null);

  if (isError) throw error;
  if (isLoading) return <Loader />;

  return (
    <main className={styles.root}>
      <div className={styles.box}>
        <BoardTickets />
        <div className={styles.creation}>
          <Routes>
            <Route
              path="/*"
              element={<CreationTicket label="создать доску" path={routes.boards.create} />}
            />
            <Route path="create" element={<BoardCreation />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default withErrorBoundary(Boards, {
  FallbackComponent: PageErrorFallback,
});
