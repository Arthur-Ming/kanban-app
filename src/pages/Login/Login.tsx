import { useLoginUserMutation } from 'redux/api/users';
import LoginForm from './LoginForm';

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  return <LoginForm onSubmit={loginUser} isLoading={isLoading} />;
};

export default Login;
