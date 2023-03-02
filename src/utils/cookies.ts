import Cookies from 'js-cookie';
import { AuthorizationError } from './appErrors';

export const getToken = (): string => {
  const token = Cookies.get('token') || null;
  if (!token) {
    throw new AuthorizationError();
  }
  return token;
};

export const getUserId = (): string => {
  const userId = Cookies.get('userId') || null;
  if (!userId) {
    throw new AuthorizationError();
  }
  return userId;
};
