import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard, ICreateBoardBody } from 'interfaces';
import { apiRoutes, api } from 'utils/api';

export const loadBoards = createAsyncThunk('boards', async () => {
  return await api.get(apiRoutes.boards());
});

export const createBoard = createAsyncThunk('boards/create', async (body: ICreateBoardBody) => {
  return await api.post(apiRoutes.boards(), body);
});

export const removeBoard = createAsyncThunk('boards/delete', async (board: IBoard) => {
  return await api.delete(apiRoutes.boardById(board.id));
});
