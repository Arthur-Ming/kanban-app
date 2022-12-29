import {
  IAddBoard,
  IBoard,
  ISetBoards,
  IDeleteBoard,
  IAddColumnAction,
  IDeleteColumn,
} from 'interfaces';
import { ADD_BOARD, SET_BOARDS, DELETE_BOARD, ADD_COLUMN, DELETE_COLUMN } from '../action-types';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';

export interface IBoardsState {
  entities: { [key: string]: IBoard };
}

const initialState: IBoardsState = { entities: {} };

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_BOARDS, (state, action) => {
      const { boards } = <ISetBoards>action;
      state.entities = arrToMap(boards);
    })
    .addCase(ADD_BOARD, (state, action) => {
      const { board } = <IAddBoard>action;
      state.entities[board.id] = board;
    })
    .addCase(DELETE_BOARD, (state, action) => {
      const { boardId } = <IDeleteBoard>action;
      delete state.entities[boardId];
    })
    .addCase(ADD_COLUMN, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.entities[column.boardId].columns.push(column.id);
    })
    .addCase(DELETE_COLUMN, (state, action) => {
      const { boardId, columnId } = <IDeleteColumn>action;
      state.entities[boardId].columns = state.entities[boardId].columns.filter(
        (id) => columnId !== id
      );
    });
});
