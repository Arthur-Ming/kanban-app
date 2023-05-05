import { IFetchError } from 'interfaces';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from 'redux/api/auth';
import LoginForm from './LoginForm';
import styles from './index.module.scss';
import AuthLayout from 'components/AuthLayout';
import SpinnerLoader from 'components/SpinnerLoader';
import { useSelector } from 'react-redux';

const Login = () => {
  const loggedUser = false;
  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  if (loggedUser) return <Navigate to="/" />;

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 404 || errorStatus === 403) {
      toast.error('неверные учетные данные!', {
        toastId: errorStatus,
      });
    } else {
      toast.error('неудалось войти', {
        toastId: errorStatus,
      });
    }
  }
  if (isSuccess) {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }
  return (
    <AuthLayout>
      {isLoading && <SpinnerLoader />}
      <LoginForm onSubmit={loginUser} isLoading={isLoading} />
      <div className={styles.text}>
        <span>Нет аккаунта?</span>
        <NavLink className={styles.link} to="/register">
          Зарегистрируйтесь
        </NavLink>
      </div>
    </AuthLayout>
  );
};
export default Login;
