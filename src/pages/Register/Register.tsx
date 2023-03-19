import { useRegisterUserMutation } from 'redux/api/users';
import RegisterForm from './RegisterForm';
import styles from './index.module.scss';
import { Navigate, NavLink } from 'react-router-dom';
import AuthLayout from 'components/AuthLayout';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from 'redux/selectors/session';

const Register = () => {
  const loggedUser = useSelector(loggedUserSelector);
  const [addUser, { isLoading }] = useRegisterUserMutation();

  if (loggedUser) return <Navigate to="/" />;

  return (
    <AuthLayout>
      <RegisterForm onSubmit={addUser} isLoading={isLoading} />
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
