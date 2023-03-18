import { IFetchError } from 'interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from 'redux/api/users';
import LoginForm from './LoginForm';
import styles from './index.module.scss';
import AuthLayout from 'components/AuthLayout';

const Login = () => {
  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginUserMutation();

  const navigate = useNavigate();

  if (isError) throw error;
  if (isSuccess) {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    }
  }
  return (
    <AuthLayout>
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
/* 
export default Login; */
