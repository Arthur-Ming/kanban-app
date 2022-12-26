import { IBoard, ICreateBoard, IGetAllBoards } from 'interfaces';
import { ADD_BOARD, LOAD_BOARDS, REQUEST, SUCCESS } from '../action-types';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';

export interface IBoardsState {
  loading: boolean;
  loaded: boolean;
  error: null;
  entities: {
    [key: string]: IBoard;
  };
}

const initialState: IBoardsState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_BOARDS + REQUEST, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
    })
    .addCase(LOAD_BOARDS + SUCCESS, (state, action) => {
      const { data } = <IGetAllBoards>action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      data && (state.entities = arrToMap(data));
    })
    .addCase(ADD_BOARD + SUCCESS, (state, action: ICreateBoard) => {
      const { data } = action;
      data && (state.entities[data.id] = data);
    });
});
