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
  LOAD_COLUMNS,
  LOAD_TASKS,
} from './constants';
import { Dispatch } from 'redux';
import {
  IAction,
  IActionCallApi,
  IColumnsOrderChange,
  ICreatColumn,
  ICreatTask,
  IDeleteColumn,
  IDeleteTask,
  IGetAllBoards,
  IGetAllColumns,
  IGetAllTasks,
  IGetBoardById,
} from 'interfaces';

export const getAllBoards = (): IGetAllBoards => ({
  type: LOAD_BOARDS,
  CallAPI: 'http://localhost:8000/boards',
  data: null,
  error: null,
});

export const getBoardById = (boardId: string): IGetBoardById => ({
  type: LOAD_BOARD,
  CallAPI: `http://localhost:8000/boards/${boardId}`,
  data: null,
  error: null,
});

export const getAllColumns = (boardId: string): IGetAllColumns => ({
  type: LOAD_COLUMNS,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns`,
  data: null,
  error: null,
  boardId,
});

export const getAllTasks = (boardId: string, columnId = ' '): IGetAllTasks => ({
  type: LOAD_TASKS,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks`,
  data: null,
  error: null,
  boardId,
  columnId,
});

export const resetBoard = (): IAction => ({
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
}): IColumnsOrderChange => ({
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
}): IColumnsOrderChange => ({
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
}): ICreatTask => ({
  type: CREATE_TASK,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks`,
  boardId,
  columnId,
  title,
  newTask: null,
});

export const deleteTask = ({
  boardId,
  columnId,
  taskId,
}: {
  boardId: string;
  columnId: string;
  taskId: string;
}): IDeleteTask => ({
  type: DELETE_TASK,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
  boardId,
  columnId,
  taskId,
});

export const creatColumn = ({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}): ICreatColumn => ({
  type: CREATE_COLUMN,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns`,
  boardId,
  title,
  newColumn: null,
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

export const deleteColumn = ({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: string;
}): IDeleteColumn => ({
  type: DELETE_COLUMN,
  CallAPI: `http://localhost:8000/boards/${boardId}/columns/${columnId}`,
  boardId,
  columnId,
});
