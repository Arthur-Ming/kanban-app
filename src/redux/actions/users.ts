import { ISaveUserAction, IUser, IUserLoginBody, IUserRegisterBody } from 'interfaces';
import Cookies from 'js-cookie';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { USER_SAVE } from 'redux/action-types';
import { api, apiRoutes, buildURL } from 'utils/api';
import { requestKey } from 'utils/requestService';
import { requestFailure, requestPending, requestSuccess } from './requests';

const tokenExpire = 0.5;

export const addUser =
  (userRegisterBody: IUserRegisterBody) => async (dispatch: Dispatch<AnyAction>) => {
    const callAPI = apiRoutes.userRegister();
    const key = requestKey.create(callAPI);

    dispatch(requestPending(key));

    try {
      const user = await api.post(buildURL(callAPI), userRegisterBody);
      console.log(user);
      dispatch(requestSuccess(key));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch(requestFailure(key, err.message));
      }
    }
  };

export const saveUser = (user: IUser) => {
  Cookies.set('token', user.token, {
    expires: tokenExpire,
  });

  return {
    type: USER_SAVE,
    user,
  };
};

export const loginUser =
  (userRegisterBody: IUserLoginBody) => async (dispatch: Dispatch<AnyAction>) => {
    const callAPI = apiRoutes.userLogin();
    const key = requestKey.create(callAPI);

    dispatch(requestPending(key));

    try {
      const user: IUser = await api.post(buildURL(callAPI), userRegisterBody);
      console.log(user);
      dispatch(requestSuccess(key));
      dispatch(saveUser(user));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch(requestFailure(key, err.message));
      }
    }
  };
