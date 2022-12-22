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
  dispatch({ type: LOAD_BOARDS + REQUEST });

  try {
    const data = await fetch(`http://localhost:8000/boards/${boardId}`);
    const populatedBoard: IPopulatedBoard = await data.json();

    const { tasks, columns, board } = separatePopulatedBoard(populatedBoard);
    dispatch(setTasks(tasks));
    dispatch(setColumns(columns));
    dispatch({ type: LOAD_BOARDS + SUCCESS, data: [board] });
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch({ type: LOAD_BOARDS + FAILURE, error: err.message });
    }
  }
};
