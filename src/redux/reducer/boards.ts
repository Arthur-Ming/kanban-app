import { IAddBoard, IBoard, IDeleteBoard, ILoadBoards } from 'interfaces';
import { REQUEST, SUCCESS, ADD_BOARD, LOAD_BOARDS, DELETE_BOARD } from '../action-types';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';

export interface IBoardsState {
  loading: boolean;
  adding: boolean;
  deleting: { [key: string]: boolean };
  entities: { [key: string]: IBoard };
}

const initialState: IBoardsState = {
  entities: {},
  loading: false,
  adding: false,
  deleting: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_BOARDS + REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_BOARDS + SUCCESS, (state, action) => {
      const { boards } = <ILoadBoards>action;
      state.loading = false;
      state.entities = arrToMap(boards);
    })
    .addCase(ADD_BOARD + REQUEST, (state) => {
      state.adding = true;
    })
    .addCase(ADD_BOARD + SUCCESS, (state, action) => {
      const { board } = <IAddBoard>action;
      state.entities[board.id] = board;
      state.adding = false;
    })
    .addCase(DELETE_BOARD + REQUEST, (state, action) => {
      const { board } = <IDeleteBoard>action;
      state.deleting[board.id] = true;
    })
    .addCase(DELETE_BOARD + SUCCESS, (state, action) => {
      const { board } = <IDeleteBoard>action;
      delete state.entities[board.id];
      state.deleting[board.id] = false;
    });
});
