import { IAddBoard, IBoard, ISetBoards, IDeleteBoard } from 'interfaces';
import { ADD_BOARD, SET_BOARDS, DELETE_BOARD } from '../action-types';
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
    });
});
