import BoardTickets from './BoardTickets';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Navigate, Route, Routes } from 'react-router';
import Loader from 'components/Loader';
import CreationTicket from 'components/CreationTicket';
import { useLoadBoardsQuery } from 'redux/api/boards';
import { withErrorBoundary } from 'react-error-boundary';

const Boards = () => {
  const { isLoading, isError, error } = useLoadBoardsQuery(null);
  if (isError) console.log(error);
  if (isLoading) return <Loader />;

  return (
    <main className={styles.root}>
      <div className={styles.box}>
        <BoardTickets />
        <div className={styles.creation}>
          <Routes>
            <Route path="/*" element={<CreationTicket label="создать доску" path="create" />} />
            <Route path="create" element={<BoardCreation />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default Boards;
/* 
export default withErrorBoundary(Boards, {
  fallbackRender: ({ error, resetErrorBoundary }) => {
    console.log(error.message);
    console.log((error as { originalStatus?: number })?.originalStatus);
    if (error.message === 'NO_TOKEN') {
      return <Navigate to={`/login`} replace={true} />;
    }
    return (
      <div role="alert">
        <div>Oh no</div>
        <pre>{error.message}</pre>
      </div>
    );
  },
});
 */
