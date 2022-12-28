import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { ADD_BOARD, DELETE_BOARD, SET_BOARDS } from '../action-types';
import {
  IBoard,
  ICreateBoardBody,
  ISetBoards,
  IAddBoard,
  IDeleteBoard,
  IPopulatedBoard,
} from 'interfaces';

import { apiRoutes, buildURL, api } from 'utils/api';
import { setTasks } from './tasks';
import { setColumns } from './columns';
import { requestFailure, requestPending, requestSuccess } from './requests';
import { separateBoard } from 'utils/separateBoard';
import { requestKey } from 'utils/requestService';

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

export const loadBoards = () => async (dispatch: Dispatch<AnyAction>) => {
  const callAPI = apiRoutes.boards();
  const key = requestKey.read(callAPI);

  dispatch(requestPending(key));

  try {
    const boards = await api.get(buildURL(callAPI));
    dispatch(setBoards(boards));
    dispatch(requestSuccess(key));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(requestFailure(key, err.message));
    }
  }
};

export const createBoard = (body: ICreateBoardBody) => async (dispatch: Dispatch<AnyAction>) => {
  const route = apiRoutes.boards();
  const key = requestKey.create(route);

  dispatch(requestPending(key));

  try {
    const data = await api.post(buildURL(route), body);
    dispatch(addBoard(data));
    dispatch(requestSuccess(key));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(requestFailure(key, err.message));
    }
  }
};

export const removeBoard = (boardId: string) => async (dispatch: Dispatch<AnyAction>) => {
  const route = apiRoutes.boardById(boardId);
  const key = requestKey.delete(route);

  dispatch(requestPending(key));
  dispatch(deleteBoard(boardId));
  try {
    await api.delete(buildURL(route));
    dispatch(requestSuccess(key));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(requestFailure(key, err.message));
    }
  }
};

export const getBoardById = (boardId: string) => async (dispatch: Dispatch<AnyAction>) => {
  const route = apiRoutes.boardById(boardId);
  const key = requestKey.read(route);

  dispatch(requestPending(key));

  try {
    const populatedBoard: IPopulatedBoard = await api.get(buildURL(route));
    const { tasks, columns, board } = separateBoard(populatedBoard);
    dispatch(setTasks(tasks));
    dispatch(setColumns(columns));
    dispatch(addBoard(board));
    dispatch(requestSuccess(key));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(requestFailure(key, err.message));
    }
  }
};
