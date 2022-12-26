import { Routes, Route, Navigate } from 'react-router';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import TaskCreation from 'pages/Board/TaskCreation';
import Task from 'pages/Board/Task';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import ColumnCreation from 'pages/Board/ColumnCreation';
import Boards from 'pages/Boards';
import BoardCreation from 'pages/Boards/BoardCreation';

const AppRoutes = () => (
  <Routes>
    <Route path={'/boards/*'} element={<Boards />}>
      <Route path="create-board" element={<BoardCreation />} />
    </Route>
    <Route path={`/boards/:boardId/*`} element={<Board />}>
      <Route path="creat-column" element={<ColumnCreation />} />
      <Route path={routes.tasks.creat.absolute()} element={<TaskCreation />} />
      <Route path={routes.tasks.content.absolute()} element={<Task />} />
    </Route>
    <Route path="/boards/:boardId/*" element={<ErrorPage />} />
    <Route path="/errorPage/*" element={<ErrorPage />} />
    <Route path="/*" element={<Navigate to="/errorPage" replace />} />
  </Routes>
);

export default AppRoutes;
