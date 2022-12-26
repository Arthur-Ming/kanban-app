//import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  ADD_BOARD,
  FAILURE,
  FETCH,
  LOAD_BOARDS,
  REQUEST,
  SET_BOARDS,
  SUCCESS,
} from '../action-types';
import { ICreateBoardBody, IRequestAction } from 'interfaces';

export const getBoards = () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
  dispatch({ type: FETCH + REQUEST, resource: 'boards' });

  try {
    const data = await fetch('http://localhost:8000/boards');
    const res = await data.json();
    dispatch({ type: SET_BOARDS, data: res });
    dispatch({ type: FETCH + SUCCESS, resource: 'boards' });
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
