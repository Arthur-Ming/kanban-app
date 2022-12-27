//import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  ADD_BOARD,
  DELETE_BOARD,
  FAILURE,
  FETCH,
  LOAD_BOARD,
  REQUEST,
  SET_BOARDS,
  SUCCESS,
} from '../action-types';
import {
  IBoard,
  ICreateBoardBody,
  ISetBoards,
  IRequestAction,
  IAddBoard,
  IDeleteBoard,
  IPopulatedBoard,
  ITask,
  IColumn,
} from 'interfaces';
import { baseRoutes, routes } from 'utils/routes';
import { apiRoutes } from 'utils/apiRoutes';
import { setTasks } from './tasks';
import { setColumns } from './columns';

export const setBoards = (boards: IBoard[]): ISetBoards => ({
  type: SET_BOARDS,
  boards,
});

export const addBoard = (board: IBoard): IAddBoard => ({
  type: ADD_BOARD,
  board,
});

export const deleteBoard = (boardId: string): IDeleteBoard => ({
  type: DELETE_BOARD,
  boardId,
});

export const loadBoards =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const resource = baseRoutes.boards.base.relative;

    dispatch({ type: FETCH + REQUEST, resource });

    try {
      console.log(apiRoutes.boards());
      const data = await fetch(apiRoutes.boards());
      const res = await data.json();
      dispatch(setBoards(res));
      dispatch({ type: FETCH + SUCCESS, resource });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: FETCH + FAILURE, error: err.message });
      }
    }
  };

export const createBoard =
  (body: ICreateBoardBody) => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const resource = baseRoutes.boards.create.absolute();

    dispatch({ type: FETCH + REQUEST, resource });
    try {
      const data = await fetch(apiRoutes.boards(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      const res = await data.json();
      dispatch(addBoard(res));
      dispatch({ type: FETCH + SUCCESS, resource });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: ADD_BOARD, error: err.message });
      }
    }
  };

export const removeBoard =
  (boardId: string) => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    await fetch(apiRoutes.boardById(boardId), {
      method: 'DELETE',
    });

    dispatch(deleteBoard(boardId));
  };

const separatePopulatedBoard = (populatedBoard: IPopulatedBoard) => {
  const tasks: ITask[] = populatedBoard.columns.map(({ tasks }) => tasks).flat();

  const columns: IColumn[] = populatedBoard.columns.map(({ id, title, boardId, tasks }) => ({
    id,
    title,
    boardId,
    taskIds: tasks.map(({ id }) => id),
  }));
  const { id, title, description } = populatedBoard;
  const board: IBoard = {
    id,
    title,
    description,
    columnIds: populatedBoard.columns.map(({ id }) => id),
  };
  return {
    tasks,
    columns,
    board,
  };
};

export const getBoardById = (boardId: string) => async (dispatch: Dispatch<AnyAction>) => {
  const resource = baseRoutes.boards.byId.absolute(boardId);

  dispatch({ type: FETCH + REQUEST, resource });

  try {
    const data = await fetch(`http://localhost:8000/boards/${boardId}`);
    const populatedBoard: IPopulatedBoard = await data.json();

    const { tasks, columns, board } = separatePopulatedBoard(populatedBoard);
    dispatch(setTasks(tasks));
    dispatch(setColumns(columns));
    dispatch(addBoard(board));
    dispatch({ type: FETCH + SUCCESS, resource });
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch({ type: LOAD_BOARD + FAILURE, error: err.message });
    }
  }
};
