import { ISetSessionAction } from 'interfaces';
import Cookies from 'js-cookie';
import { SET_SESSION } from 'redux/action-types';

const tokenExpire = 0.5;

export const setSession = (token?: string): ISetSessionAction => {
  if (!token)
    return {
      type: SET_SESSION,
      isAuth: false,
    };

  Cookies.set('token', token, {
    expires: tokenExpire,
  });

  return {
    type: SET_SESSION,
    isAuth: true,
  };
};
