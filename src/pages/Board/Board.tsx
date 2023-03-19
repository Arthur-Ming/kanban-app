import Loader from 'components/Loader';
import { Route, Routes, useParams } from 'react-router';
import { useLoadBoardByIdQuery } from 'redux/api/boards';
import BoardContent from './BoardContent';
import Task from './Task';
import styles from './index.module.scss';
import { withErrorBoundary } from 'react-error-boundary';
import { routes } from 'utils/routes';
import PageErrorFallback from 'components/PageErrorFallback';

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

export default withErrorBoundary(Board, {
  FallbackComponent: PageErrorFallback,
});
