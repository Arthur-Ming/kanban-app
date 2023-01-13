import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserLoginBody, IUserRegisterBody } from 'interfaces';
import { api, apiRoutes } from 'utils/api';
import { setSession } from './session';

export const loginUser = createAsyncThunk(
  'users/login',
  async (userRegisterBody: IUserLoginBody, { dispatch }) => {
    const user: IUser = await api.post(apiRoutes.userLogin(), userRegisterBody);
    dispatch(setSession(user.token));
    return user;
  }
);

export const addUser = createAsyncThunk(
  'users/register',
  async (userRegisterBody: IUserRegisterBody) => {
    return await api.post(apiRoutes.userRegister(), userRegisterBody);
  }
);
