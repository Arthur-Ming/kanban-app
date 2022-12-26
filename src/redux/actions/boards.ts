//import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ADD_BOARD, FAILURE, LOAD_BOARDS, REQUEST, SUCCESS } from '../action-types';
import { ICreateBoardBody } from 'interfaces';

export const getBoards = () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
  dispatch({ type: LOAD_BOARDS + REQUEST });

  try {
    const data = await fetch('http://localhost:8000/boards');
    const res = await data.json();
    dispatch({ type: LOAD_BOARDS + SUCCESS, data: res });
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch({ type: LOAD_BOARDS + FAILURE, error: err.message });
    }
  }
};

export const createBoard =
  (body: ICreateBoardBody) => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    console.log(body);

    try {
      const data = await fetch('http://localhost:8000/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      const res = await data.json();
      dispatch({ type: ADD_BOARD + SUCCESS, data: res });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: ADD_BOARD + FAILURE, error: err.message });
      }
    }
  };

export const removeBoard =
  (boardId: string) => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    console.log('removeBoard');
    console.log(boardId);
  };
