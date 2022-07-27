import { IBoard, IGetAllBoards, ICreatColumn } from 'interfaces';
import { LOAD_BOARDS, REQUEST, FAILURE, SUCCESS, CREATE_COLUMN } from '../constants';
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
    })
    .addCase(LOAD_BOARDS + SUCCESS, (state, action) => {
      const { data } = <IGetAllBoards>action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      data && (state.entities = arrToMap(data));
    })
    .addCase(CREATE_COLUMN + SUCCESS, (state, action) => {
      const { newColumn, boardId } = <ICreatColumn>action;
      newColumn && state.entities[boardId].columnIds.push(newColumn._id);
    });
});
