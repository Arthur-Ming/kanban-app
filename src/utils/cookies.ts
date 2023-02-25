import Cookies from 'js-cookie';

export const getToken = (): string => {
  const token = Cookies.get('token') || null;
  if (!token) {
    throw new Error('NO_TOKEN');
  }
  return token;
};

export const getUserId = (): string => {
  const userId = Cookies.get('userId') || null;
  if (!userId) {
    throw new Error('NO_USER_ID');
  }
  return userId;
};
