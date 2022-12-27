import NotFound from 'pages/NotFound';
import { Route, Routes, useParams } from 'react-router';
import { routes } from 'utils/routes';
import BoardContent from './BoardContent';
import Task from './Task';

const Board = () => {
  const { boardId, taskId = null } = useParams();

  if (!boardId) return <NotFound />;

  return (
    <>
      <BoardContent boardId={boardId} />
      <Routes>{taskId && <Route path={routes.tasks.content()} element={<Task />} />}</Routes>
    </>
  );
};

export default Board;
