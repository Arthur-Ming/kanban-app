import { Routes, Route, Navigate } from 'react-router';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import TaskCreation from 'pages/Board/TaskCreation';
import Task from 'pages/Board/Task';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import ColumnCreation from 'pages/Board/ColumnCreation';
import Boards from 'pages/Boards';
import BoardCreation from 'pages/Boards/BoardCreation';
import Register from 'pages/Register';
import Login from 'pages/Login';
import BoardUpdate from 'pages/Board/BoardContent/BoardUpdate';
import Main from 'pages/Main';

//TODO
//routes
//styles
//delete unused elements
//

const AppRoutes = () => (
  <Routes>
    <Route index element={<Main />} />
    <Route path={`${routes.boards.base}/*`} element={<Boards />}>
      <Route path={routes.boards.create} element={<BoardCreation />} />
    </Route>
    <Route path={`${routes.boards.byId()}/*`} element={<Board />}>
      <Route path={routes.boards.update} element={<BoardUpdate />} />
      <Route path={routes.columns.create} element={<ColumnCreation />} />
      <Route path={routes.tasks.create()} element={<TaskCreation />} />
      <Route path={`${routes.tasks.byId()}/*`} element={<Task />} />
    </Route>

    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="/errorPage/*" element={<ErrorPage />} />
    <Route path="/*" element={<Navigate to="/errorPage" replace />} />
  </Routes>
);

export default AppRoutes;

//boards
//boards.create
//boardsById
//boardsById.update
//columns.create
//tasks.create
//taskById
