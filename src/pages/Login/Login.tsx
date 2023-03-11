import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from 'redux/api/users';
import LoginForm from './LoginForm';

const Login = () => {
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();

  if (isSuccess) {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    }
  }
  return <LoginForm onSubmit={loginUser} isLoading={isLoading} />;
};

export default Login;
