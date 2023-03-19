import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISession } from 'interfaces';

export interface ISessionState {
  loggedUser: ISession | null;
}

const initialState: ISessionState = {
  loggedUser: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ISession | null>) {
      state.loggedUser = action.payload;
    },
    logout(state) {
      state.loggedUser = null;
    },
  },
});

export const { logout, login } = sessionSlice.actions;
export default sessionSlice.reducer;
