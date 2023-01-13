import { IUser } from 'interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { addUser, loginUser } from 'redux/actions/users';

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.registering = true;
        state.registred = false;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.registering = false;
        state.registred = true;
      });
  },
});

export default usersSlice.reducer;
