import { useRegisterUserMutation } from 'redux/api/users';
import RegisterForm from './RegisterForm';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';
import AuthLayout from 'components/AuthLayout';

const Register = () => {
  const [addUser, { isLoading }] = useRegisterUserMutation();

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
