import { ISaveUserAction, IUser } from 'interfaces';
import { LOGIN, REQUEST, SUCCESS, USER_REGISTRATION } from '../action-types';
import { createReducer } from '@reduxjs/toolkit';

export interface IUsersState {
  current: IUser;
  loading: boolean;
  deleting: boolean;
  registering: boolean;
  registred: boolean;
}

const initialState: IUsersState = {
  current: {
    name: '',
    id: '',
    token: '',
  },
  loading: false,
  deleting: false,
  registering: false,
  registred: false,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN + REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOGIN + SUCCESS, (state, action) => {
      const { user } = <ISaveUserAction>action;
      state.loading = false;
      state.current = user;
    })
    .addCase(USER_REGISTRATION + REQUEST, (state) => {
      state.registering = true;
      state.registred = false;
    })
    .addCase(USER_REGISTRATION + SUCCESS, (state) => {
      state.registering = false;
      state.registred = true;
    });
});
