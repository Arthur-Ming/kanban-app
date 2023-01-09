import { ISaveUserAction, IUser } from 'interfaces';
import { USER_SAVE } from '../action-types';
import { createReducer } from '@reduxjs/toolkit';

export interface IUsersState {
  current: IUser;
}

const initialState: IUsersState = {
  current: {
    name: '',
    id: '',
    token: '',
  },
};

export default createReducer(initialState, (builder) => {
  builder.addCase(USER_SAVE, (state, action) => {
    const { user } = <ISaveUserAction>action;
    state.current = user;
  });
});
