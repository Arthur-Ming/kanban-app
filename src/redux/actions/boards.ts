import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { ADD_BOARD, DELETE_BOARD, LOAD_BOARDS, REQUEST, SUCCESS } from '../action-types';
import { IBoard, ICreateBoardBody } from 'interfaces';
import { apiRoutes, api } from 'utils/api';

export const loadBoards = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: LOAD_BOARDS + REQUEST });

  try {
    const boards = await api.get(apiRoutes.boards());
    dispatch({ type: LOAD_BOARDS + SUCCESS, boards });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};

export const createBoard = (body: ICreateBoardBody) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: ADD_BOARD + REQUEST });

  try {
    const board = await api.post(apiRoutes.boards(), body);
    dispatch({ type: ADD_BOARD + SUCCESS, board });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};

export const removeBoard = (board: IBoard) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: DELETE_BOARD + REQUEST, board });

  try {
    await api.delete(apiRoutes.boardById(board.id));
    dispatch({ type: DELETE_BOARD + SUCCESS, board });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};
