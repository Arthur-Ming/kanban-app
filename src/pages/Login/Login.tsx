import { IFetchError } from 'interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from 'redux/api/users';
import LoginForm from './LoginForm';
import styles from './index.module.scss';
import AuthLayout from 'components/AuthLayout';
import SpinnerLoader from 'components/SpinnerLoader';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from 'redux/selectors/session';

const Login = () => {
  const loggedUser = useSelector(loggedUserSelector);
  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  if (loggedUser) return <Navigate to="/" />;

  if (isError) throw error;
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

export default withErrorBoundary(Login, {
  fallbackRender: ({ error, resetErrorBoundary }) => {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 404 || errorStatus === 403) {
      toast.error('неверные учетные данные!', {
        toastId: errorStatus,
      });
    }
    return <Login />;
  },
});
