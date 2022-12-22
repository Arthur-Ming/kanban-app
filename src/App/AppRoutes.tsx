import { Routes, Route, Navigate } from 'react-router';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import CreatTask from 'pages/Board/CreatTask';
import Task from 'pages/Board/Task';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import ColumnCreater from 'pages/Board/ColumnCreater';
import Boards from 'pages/Boards';

const AppRoutes = () => (
  <Routes>
    <Route path={'/boards'} element={<Boards />} />
    <Route path={`/boards/:boardId/*`} element={<Board />}>
      <Route path="creat-column" element={<ColumnCreater />} />
      <Route path={routes.tasks.creat.absolute()} element={<CreatTask />} />
      <Route path={routes.tasks.content.absolute()} element={<Task />} />
    </Route>
    <Route path="/boards/:boardId/*" element={<ErrorPage />} />
    <Route path="/errorPage/*" element={<ErrorPage />} />
    <Route path="/*" element={<Navigate to="/errorPage" replace />} />
  </Routes>
);

export default AppRoutes;
