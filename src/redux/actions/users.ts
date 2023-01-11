import { IUser, IUserLoginBody, IUserRegisterBody } from 'interfaces';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { LOGIN, REQUEST, SUCCESS, USER_REGISTRATION } from 'redux/action-types';
import { api, apiRoutes } from 'utils/api';
import { setSession } from './session';

export const saveUser = (user: IUser) => ({
  type: LOGIN,
  user,
});

export const loginUser =
  (userRegisterBody: IUserLoginBody) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: LOGIN + REQUEST });

    try {
      const user: IUser = await api.post(apiRoutes.userLogin(), userRegisterBody);

      dispatch({ type: LOGIN + SUCCESS, user });
      dispatch(setSession(user.token));
    } catch (err: unknown) {
      if (err instanceof Error) {
      }
    }
  };

export const addUser =
  (userRegisterBody: IUserRegisterBody) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: USER_REGISTRATION + REQUEST });

    try {
      await api.post(apiRoutes.userRegister(), userRegisterBody);
      dispatch({ type: USER_REGISTRATION + SUCCESS });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
