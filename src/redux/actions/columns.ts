import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard, IColumn, ICreateColumnBody } from 'interfaces';
import { api, apiRoutes } from 'utils/api';

export const createColumn = createAsyncThunk(
  'columns/create',
  async ({ board, body }: { board: IBoard; body: ICreateColumnBody }) => {
    return await api.post(apiRoutes.columns(board.id), body);
  }
);

export const deleteColumn = createAsyncThunk('columns/delete', async (column: IColumn) => {
  const { boardId, id } = column;
  return await api.delete(apiRoutes.columnById(boardId, id));
});

export const updateColumn = createAsyncThunk(
  'columns/update',
  async ({ column, body }: { column: IColumn; body: ICreateColumnBody }) => {
    const { boardId, id } = column;
    return await api.put(apiRoutes.columnById(boardId, id), body);
  }
);
