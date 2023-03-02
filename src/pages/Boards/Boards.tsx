import BoardTickets from './BoardTickets';
import BoardCreation from './BoardCreation';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import { Navigate, Route, Routes } from 'react-router';
import Loader from 'components/Loader';
import CreationTicket from 'components/CreationTicket';
import { useLoadBoardsQuery } from 'redux/api/boards';
import { ErrorBoundaryProps, withErrorBoundary } from 'react-error-boundary';
import { IFetchError } from 'interfaces';

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
            <Route path="/*" element={<CreationTicket label="создать доску" path="create" />} />
            <Route path="create" element={<BoardCreation />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

/* export default Boards; */
const f: ErrorBoundaryProps = {
  fallbackRender: ({ error, resetErrorBoundary }) => {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      toast('you need to log in!', {
        toastId: errorStatus,
      });

      return <Navigate to={`/login`} replace={true} />;
    }
    return (
      <div role="alert">
        <div>Oh no</div>
        <pre>{(error as unknown as { data: string })?.data}</pre>
      </div>
    );
  },
};
export default withErrorBoundary(Boards, f);
