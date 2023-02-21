import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import { Route, Routes, useParams } from 'react-router';
import { useLoadBoardByIdQuery } from 'redux/api/boards';
import BoardContent from './BoardContent';
import Task from './Task';
import styles from './index.module.scss';

const Board = () => {
  const { boardId = '', taskId } = useParams();
  const { isLoading } = useLoadBoardByIdQuery(boardId);

  if (isLoading) return <Loader />;

  if (!boardId) return <NotFound />;

  return (
    <main className={styles.root}>
      <BoardContent boardId={boardId} />
      <Routes>
        {taskId && <Route path="columns/:columnId/tasks/:taskId/*" element={<Task />} />}
      </Routes>
    </main>
  );
};

export default Board;
