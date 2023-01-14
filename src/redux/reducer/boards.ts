import { IBoard, RequestState } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice } from '@reduxjs/toolkit';
import { createBoard, loadBoards, removeBoard } from 'redux/actions/boards';

export interface IBoardsState {
  loading: RequestState;
  adding: RequestState;
  deleting: { [boardId: string]: RequestState };
  entities: { [boardId: string]: IBoard };
  error: unknown | null;
}

const initialState: IBoardsState = {
  entities: {},
  loading: RequestState.idle,
  adding: RequestState.idle,
  deleting: {},
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBoards.pending, (state) => {
        state.loading = RequestState.loading;
      })
      .addCase(loadBoards.fulfilled, (state, action) => {
        state.loading = RequestState.loaded;
        state.entities = arrToMap(action.payload);
      })
      .addCase(loadBoards.rejected, (state, action) => {
        state.loading = RequestState.failed;
        state.error = action.error.message;
      })
      .addCase(createBoard.pending, (state) => {
        state.adding = RequestState.loading;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        const { payload: board } = action;
        state.entities[board.id] = board;
        state.adding = RequestState.loaded;
      })
      .addCase(removeBoard.pending, (state, action) => {
        state.deleting[action.meta.arg.id] = RequestState.loading;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.deleting[action.meta.arg.id] = RequestState.loaded;
        delete state.entities[action.meta.arg.id];
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.deleting[action.meta.arg.id] = RequestState.failed;
        state.error = action.error.message;
      });
  },
});

export default boardsSlice.reducer;
