import { IBoard, IColumn } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBoardsState {
  entities: { [boardId: string]: IBoard };
}

const initialState: IBoardsState = {
  entities: {},
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoards(state, action: PayloadAction<IBoard[]>) {
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
    addRefToColumn(state, action: PayloadAction<IColumn>) {
      const { payload: column } = action;
      state.entities && state.entities[column.boardId].columns.push(column.id);
    },
    deleteRefToColumn(state, action: PayloadAction<IColumn>) {
      const { payload: column } = action;
      state.entities[column.boardId].columns = state.entities[column.boardId].columns.filter(
        (columnId) => columnId !== column.id
      );
    },
    updateColumnsOrder(
      state,
      action: PayloadAction<{
        newOrderedColumns: string[];
        boardId: string;
      }>
    ) {
      const { payload } = action;

      state.entities[payload.boardId].columns = payload.newOrderedColumns;
    },
  },
});

export const {
  addBoards,
  addBoard,
  deleteBoard,
  updateBoard,
  addRefToColumn,
  deleteRefToColumn,
  updateColumnsOrder,
} = boardsSlice.actions;

export default boardsSlice.reducer;
