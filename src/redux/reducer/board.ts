import { IBoard, IGetBoardByIdAction } from 'interfaces';
import { LOAD_BOARD, REQUEST, FAILURE, SUCCESS } from '../action-types';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';

export interface IBoardState {
  loading: boolean;
  loaded: boolean;
  error: null | unknown;
  entitie: IBoard | null;
}

const initialState: IBoardState = {
  loading: false,
  loaded: false,
  error: null,
  entitie: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_BOARD + REQUEST, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      state.entitie = null;
    })
    .addCase(LOAD_BOARD + SUCCESS, (state, action: IGetBoardByIdAction) => {
      const { data } = action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      state.entitie = data;
    })
    .addCase(LOAD_BOARD + FAILURE, (state, action: IGetBoardByIdAction) => {
      const { error = null } = action;
      state.loading = false;
      state.loaded = false;
      state.error = error;
    });
});
