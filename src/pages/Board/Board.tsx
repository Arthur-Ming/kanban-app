import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import { Navigate, Route, Routes, useParams } from 'react-router';
import { useLoadBoardByIdQuery } from 'redux/api/boards';
import BoardContent from './BoardContent';
import Task from './Task';
import styles from './index.module.scss';
import { ErrorBoundaryProps, withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { IFetchError } from 'interfaces';
import { routes } from 'utils/routes';

const Board = () => {
  const { boardId = '', taskId } = useParams();
  const { isLoading, isError, error } = useLoadBoardByIdQuery(boardId);
  if (isError) throw error;
  if (isLoading) return <Loader />;

  return (
    <main className={styles.root}>
      <BoardContent boardId={boardId} />
      <Routes>{taskId && <Route path={`${routes.tasks.byId()}/*`} element={<Task />} />}</Routes>
    </main>
  );
};

const f: ErrorBoundaryProps = {
  fallbackRender: ({ error, resetErrorBoundary }) => {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      toast('you need to log in!', {
        toastId: errorStatus,
      });

      return <Navigate to={`/login`} />;
    }
    return (
      <div role="alert">
        <div>Oh no</div>
        <pre>{(error as unknown as { data: string })?.data}</pre>
      </div>
    );
  },
};

export default withErrorBoundary(Board, f);
