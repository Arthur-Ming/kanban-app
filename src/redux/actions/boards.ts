//import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { FAILURE, LOAD_BOARDS, REQUEST, SET_COLUMNS, SUCCESS } from '../action-types';
import { IBoard, IColumn, ITask, IPopulatedBoard } from 'interfaces';
import { setColumns } from './columns';
import { setTasks } from './tasks';

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
