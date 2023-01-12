import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard, IPopulatedBoard, IUpdateBoard } from 'interfaces';
import { apiRoutes, api } from 'utils/api';
import { separateBoard } from 'utils/separateBoard';
import { setColumns } from 'redux/reducer/columns';
import { setTasks } from 'redux/reducer/tasks';

export const getBoardById = createAsyncThunk('board', async (boardId: string, { dispatch }) => {
  const populatedBoard: IPopulatedBoard = await api.get(apiRoutes.boardById(boardId));
  const { tasks, columns, board } = separateBoard(populatedBoard);
  dispatch(setColumns(columns));
  dispatch(setTasks(tasks));
  return board;
});

export const updateBoard = createAsyncThunk(
  'board/update',
  async ({ board, body }: { board: IBoard; body: IUpdateBoard }) => {
    return await api.put(apiRoutes.boardById(board.id), body);
  }
);
