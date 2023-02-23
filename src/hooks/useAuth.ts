import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLazyUserByIdQuery } from 'redux/api/users';

const useAuth = () => {
  const [query, { isLoading, data }] = useLazyUserByIdQuery();
  const token = Cookies.get('token') || null;
  const userId = Cookies.get('userId') || null;
  console.log(data);
  console.log(isLoading);
  useEffect(() => {
    if (token && userId) {
      query(userId, false);
    }
  }, [query, token, userId]);

  if (token && userId) {
    /*  query(userId); */
  }

  return false;
};

export default useAuth;
