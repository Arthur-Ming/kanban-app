import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import { Route, Routes, useParams } from 'react-router';
import { useLoadBoardByIdQuery } from 'redux/api/boards';
import { routes } from 'utils/routes';
import BoardContent from './BoardContent';
import Task from './Task';

const Board = () => {
  const { boardId = '', taskId } = useParams();
  const { isLoading } = useLoadBoardByIdQuery(boardId);

  if (isLoading) return <Loader />;

  if (!boardId) return <NotFound />;

  return (
    <>
      <BoardContent boardId={boardId} />
      <Routes>
        {taskId && <Route path="columns/:columnId/tasks/:taskId/*" element={<Task />} />}
      </Routes>
    </>
  );
};

export default Board;
