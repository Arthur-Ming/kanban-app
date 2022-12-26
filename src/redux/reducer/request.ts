import { createReducer } from '@reduxjs/toolkit';
import { IRequestAction } from 'interfaces';
import { FETCH, REQUEST, SUCCESS } from 'redux/action-types';

export interface IRequestState {
  fetching: {
    [key: string]: boolean;
  };
  loaded: {
    [key: string]: boolean;
  };
  errors: {
    [key: string]: string;
  };
}

const initialState: IRequestState = {
  fetching: {},
  loaded: {},
  errors: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH + REQUEST, (state, action: IRequestAction) => {
      const { resource } = action;
      state.fetching[resource] = true;
      state.loaded[resource] = false;
    })
    .addCase(FETCH + SUCCESS, (state, action: IRequestAction) => {
      const { resource } = action;
      state.fetching[resource] = false;
      state.loaded[resource] = true;
    });
});
