import { useRegisterUserMutation } from 'redux/api/users';
import RegisterForm from './RegisterForm';
import styles from './index.module.scss';

const Register = () => {
  const [addUser, { isLoading }] = useRegisterUserMutation();

  return (
    <main className={styles.root}>
      <RegisterForm onSubmit={addUser} isLoading={isLoading} />
    </main>
  );
};

export default Register;
