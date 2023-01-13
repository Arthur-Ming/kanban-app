import { IBoard } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice } from '@reduxjs/toolkit';
import { createBoard, loadBoards, removeBoard } from 'redux/actions/boards';

export interface IBoardsState {
  loading: boolean;
  adding: boolean;
  deleting: { [boardId: string]: boolean };
  entities: { [boardId: string]: IBoard };
}

const initialState: IBoardsState = {
  entities: {},
  loading: false,
  adding: false,
  deleting: {},
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = arrToMap(action.payload);
      })
      .addCase(createBoard.pending, (state) => {
        state.adding = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        const { payload: board } = action;
        state.entities[board.id] = board;
        state.adding = false;
      })
      .addCase(removeBoard.pending, (state, action) => {
        state.deleting[action.meta.arg.id] = true;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.deleting[action.meta.arg.id] = false;
        delete state.entities[action.meta.arg.id];
      });
  },
});

export default boardsSlice.reducer;
