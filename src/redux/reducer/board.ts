import { IAddBoard, IAddColumnAction, IBoard, IDeleteColumn, ILoadBoard } from 'interfaces';
import {
  ADD_COLUMN,
  DELETE_COLUMN,
  LOAD_BOARD,
  REQUEST,
  SUCCESS,
  UPDATE_BOARD,
} from '../action-types';

import { createReducer } from '@reduxjs/toolkit';

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

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_BOARD + REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_BOARD + SUCCESS, (state, action) => {
      const { board } = <ILoadBoard>action;
      state.loading = false;
      state.entities = board;
    })
    .addCase(UPDATE_BOARD + REQUEST, (state) => {
      state.updating = true;
    })
    .addCase(UPDATE_BOARD + SUCCESS, (state, action) => {
      const { board } = <IAddBoard>action;
      state.updating = false;
      state.entities = board;
    })
    .addCase(ADD_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.entities && state.entities.columns.push(column.id);
    })
    .addCase(DELETE_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IDeleteColumn>action;
      state.entities &&
        (state.entities.columns = state.entities.columns.filter((id) => id !== column.id));
    });
});
