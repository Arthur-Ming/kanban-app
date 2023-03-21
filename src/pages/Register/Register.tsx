import { useLoginUserMutation, useRegisterUserMutation } from 'redux/api/users';
import RegisterForm from './RegisterForm';
import styles from './index.module.scss';
import { Navigate, NavLink } from 'react-router-dom';
import AuthLayout from 'components/AuthLayout';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from 'redux/selectors/session';
import SpinnerLoader from 'components/SpinnerLoader';
import { useEffect, useState } from 'react';
import { IFetchError, IUserRegisterBody } from 'interfaces';
import { toast } from 'react-toastify';

const Register = () => {
  const loggedUser = useSelector(loggedUserSelector);
  const [registerBody, setRegisterBody] = useState<IUserRegisterBody | undefined>();

  const [
    addUser,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (isRegisterSuccess && registerBody) {
      console.log(registerBody);
      const { email, password } = registerBody;
      loginUser({ email, password });
    }
  }, [isRegisterSuccess, loginUser, registerBody]);

  if (isRegisterError) {
    const errorStatus = (registerError as unknown as IFetchError)?.status;
    if (errorStatus === 417) {
      toast.error('пользователь с таким email уже существует', {
        toastId: errorStatus,
      });
    } else {
      toast.error('неудалось зарегестрировать пользователя', {
        toastId: errorStatus,
      });
    }
  }

  const onSubmit = (body: IUserRegisterBody) => {
    setRegisterBody(body);
    addUser(body);
  };

  if (loggedUser) return <Navigate to="/" />;

  return (
    <AuthLayout>
      {(isRegisterLoading || isLoginLoading) && <SpinnerLoader />}
      <RegisterForm onSubmit={onSubmit} isLoading={isRegisterLoading} />
      <div className={styles.text}>
        <span>Уже есть аккаунт?</span>
        <NavLink className={styles.link} to="/login">
          Войдите
        </NavLink>
      </div>
    </AuthLayout>
  );
};

export default Register;
