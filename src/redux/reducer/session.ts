import { ISetSessionAction } from 'interfaces';
import { SESSION_SET } from '../action-types';
import { createReducer } from '@reduxjs/toolkit';

export interface ISessionState {
  isUserAuth: boolean;
}

const initialState: ISessionState = {
  isUserAuth: false,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SESSION_SET, (state, action) => {
    const { isAuth } = <ISetSessionAction>action;
    state.isUserAuth = isAuth;
  });
});
