import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { LOAD_BOARD, REQUEST, SET_BOARDS, SUCCESS, UPDATE_BOARD } from '../action-types';
import { IBoard, ISetBoards, IPopulatedBoard, IUpdateBoard } from 'interfaces';
import { apiRoutes, api } from 'utils/api';
import { setTasks } from './tasks';
import { setColumns } from './columns';
import { separateBoard } from 'utils/separateBoard';

export const setBoards = (boards: IBoard[]): ISetBoards => ({
  type: SET_BOARDS,
  boards,
});

export const getBoardById = (boardId: string) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: LOAD_BOARD + REQUEST });

  try {
    const populatedBoard: IPopulatedBoard = await api.get(apiRoutes.boardById(boardId));
    const { tasks, columns, board } = separateBoard(populatedBoard);

    dispatch({ type: LOAD_BOARD + SUCCESS, board });
    dispatch(setColumns(columns));
    dispatch(setTasks(tasks));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};

export const updateBoard =
  (body: IUpdateBoard, board?: IBoard) => async (dispatch: Dispatch<AnyAction>) => {
    if (!board) return;

    dispatch({ type: UPDATE_BOARD + REQUEST });

    try {
      const updatedBoard = await api.put(apiRoutes.boardById(board.id), body);
      console.log(updatedBoard);
      dispatch({ type: UPDATE_BOARD + SUCCESS, board: updatedBoard });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };
