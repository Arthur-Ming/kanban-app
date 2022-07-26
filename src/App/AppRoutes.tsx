import { Routes, Route, Navigate } from 'react-router';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/Board/components/TaskContent';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import MainPage from 'pages/Main';
import CreatColumn from 'pages/Board/components/CreatColumn';
import Boards from 'pages/Boards';

const AppRoutes = () => (
  <Routes>
    <Route path={'/boards/*'} element={<Boards />}>
      <Route path={`:boardId/*`} element={<Board />}>
        <Route path="creat-column" element={<CreatColumn />} />
        <Route path={routes.tasks.creat.absolute()} element={<CreatTask />} />
        <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
      </Route>
    </Route>

    <Route path="/errorPage/*" element={<ErrorPage />} />
    <Route path="/*" element={<Navigate to="/errorPage" replace />} />
  </Routes>
);

export default AppRoutes;
