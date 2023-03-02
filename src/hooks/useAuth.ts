import { useUserByIdQuery } from 'redux/api/users';
import { getUserId } from 'utils/cookies';

const useAuth = () => {
  const { isError } = useUserByIdQuery(null);
  if (isError) return false;

  return true;
};

export default useAuth;
