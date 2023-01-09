import { IUserRegisterBody } from 'interfaces';
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
      console.log(buildURL(callAPI));
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
