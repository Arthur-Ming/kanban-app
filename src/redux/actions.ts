import {
  COLUMNS_ORDER_CHANGE,
  CREATE_TASK,
  CREATE_COLUMN,
  DELETE_TASK,
  LOAD_BOARD,
  LOAD_BOARDS,
  RESET_BOARD,
  TASKS_ORDER_CHANGE,
  DELETE_COLUMN,
} from './constants';
import { Dispatch } from 'redux';

export const getAllBoards = () => ({
  type: LOAD_BOARDS,
  CallAPI: 'http://localhost:8000/boards',
});

export const getBoardById = (boardId: string) => ({
  type: LOAD_BOARD,
  CallAPI: `http://localhost:8000/boards/${boardId}`,
});

export const resetBoard = () => ({
  type: RESET_BOARD,
});

export const columnsOrderChange = ({
  boardId,
  columnId,
  order,
}: {
  boardId: string;
  columnId: string;
  order: number;
}) => ({
  type: COLUMNS_ORDER_CHANGE,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}`,
  boardId,
  columnId,
  order,
});

export const tasksOrderChange = ({
  taskId,
  boardId,
  columnId,
  order,
}: {
  taskId: string;
  boardId: string;
  columnId: string;
  order: number;
}) => ({
  type: TASKS_ORDER_CHANGE,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
  boardId,
  columnId,
  order,
});
/* 
export const creatTask =
  (boardId: string, columnId: string, title: string) => (dispatch: Dispatch) => {
    console.log('creatTask');
    dispatch({
      type: CREATE_TASK,
      CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks`,
      boardId,
      columnId,
      title,
    });
  }; */

export const creatTask = ({
  boardId,
  columnId,
  title,
}: {
  boardId: string;
  columnId: string;
  title: string;
}) => ({
  type: CREATE_TASK,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks`,
  boardId,
  columnId,
  title,
});

export const deleteTask = ({
  boardId,
  columnId,
  taskId,
}: {
  boardId: string;
  columnId: string;
  taskId: string;
}) => ({
  type: DELETE_TASK,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
  boardId,
  columnId,
  _id: taskId,
});

export const creatColumn = ({ boardId, title }: { boardId: string; title: string }) => ({
  type: CREATE_COLUMN,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns`,
  boardId,
  title,
});

/* export const creatTask =
  (boardId: string, columnId: string, title: string) => (dispatch: Dispatch) => {
    console.log('creatTask');
    dispatch({
      type: CREATE_TASK,
      CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks`,
      boardId,
      columnId,
      title,
    });
  };  */

export const deleteColumn = ({ boardId, columnId }: { boardId: string; columnId: string }) => ({
  type: DELETE_COLUMN,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}`,
  boardId,
  columnId,
});
