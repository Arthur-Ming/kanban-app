import { IUser } from 'interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from 'redux/actions/users';

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

export default usersSlice.reducer;
