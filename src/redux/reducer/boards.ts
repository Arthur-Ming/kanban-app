import { IBoard, RequestState } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    setBoards(state, action: PayloadAction<IBoard[]>) {
      state.entities = arrToMap(action.payload);
    },
    addBoard(state, action: PayloadAction<IBoard>) {
      const { payload: board } = action;
      state.entities[board.id] = board;
    },
    deleteBoard(state, action: PayloadAction<IBoard>) {
      const { payload: board } = action;
      delete state.entities[board.id];
    },
    updateBoard(state, action: PayloadAction<IBoard>) {
      const { payload: board } = action;
      state.entities[board.id] = board;
    },
  },
});

export const { setBoards, addBoard, deleteBoard, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
