import { IUser, IUserLoginBody, IUserRegisterBody } from 'interfaces';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { USER_SAVE } from 'redux/action-types';
import { api, apiRoutes } from 'utils/api';
import { setSession } from './session';

export const saveUser = (user: IUser) => ({
  type: USER_SAVE,
  user,
});

export const addUser =
  (userRegisterBody: IUserRegisterBody) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      const user = await api.post(apiRoutes.userRegister(), userRegisterBody);
      console.log(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

export const loginUser =
  (userRegisterBody: IUserLoginBody) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      const user: IUser = await api.post(apiRoutes.userLogin(), userRegisterBody);

      dispatch(saveUser(user));
      dispatch(setSession(user.token));
    } catch (err: unknown) {
      if (err instanceof Error) {
      }
    }
  };
