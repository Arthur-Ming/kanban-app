import { ISetSessionAction } from 'interfaces';
import { SET_SESSION } from '../action-types';
import { createReducer } from '@reduxjs/toolkit';

export interface ISessionState {
  isUserAuth: boolean;
}

const initialState: ISessionState = {
  isUserAuth: false,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SET_SESSION, (state, action) => {
    const { isAuth } = <ISetSessionAction>action;
    state.isUserAuth = isAuth;
  });
});
