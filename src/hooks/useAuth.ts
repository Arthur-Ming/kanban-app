import { useUserByIdQuery } from 'redux/api/users';

const useAuth = () => {
  const { data, isError, error } = useUserByIdQuery(null);
  if (isError) console.error(error);

  return false;
};

export default useAuth;
