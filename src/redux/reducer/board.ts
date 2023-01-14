import { IBoard, RequestState } from 'interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { getBoardById, updateBoard } from 'redux/actions/board';
import { createColumn, deleteColumn } from 'redux/actions/columns';

export interface IBoardState {
  loading: RequestState;
  updating: RequestState;
  entities: IBoard | null;
}

const initialState: IBoardState = {
  entities: null,
  loading: RequestState.idle,
  updating: RequestState.idle,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.pending, (state) => {
        state.loading = RequestState.loading;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.loading = RequestState.loaded;
        state.entities = action.payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.updating = RequestState.loading;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.updating = RequestState.loaded;
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
