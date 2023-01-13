import { IBoard } from 'interfaces';
import { createReducer, createSlice } from '@reduxjs/toolkit';
import { getBoardById, updateBoard } from 'redux/actions/board';
import { createColumn, deleteColumn } from 'redux/actions/columns';

export interface IBoardState {
  loading: boolean;
  updating: boolean;
  entities: IBoard | null;
}

const initialState: IBoardState = {
  entities: null,
  loading: false,
  updating: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.updating = false;
        state.entities = action.payload;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        const { payload: column } = action;
        state.entities && state.entities.columns.push(column.id);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.entities &&
          (state.entities.columns = state.entities.columns.filter(
            (id) => id !== action.payload.id
          ));
      });
  },
});

export default boardSlice.reducer;
