import { IUserLoginBody, IUserRegisterBody } from 'interfaces';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { api, apiRoutes, buildURL } from 'utils/api';
import { requestKey } from 'utils/requestService';
import { requestFailure, requestPending, requestSuccess } from './requests';

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

export const loginUser =
  (userRegisterBody: IUserLoginBody) => async (dispatch: Dispatch<AnyAction>) => {
    const callAPI = apiRoutes.userLogin();
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
