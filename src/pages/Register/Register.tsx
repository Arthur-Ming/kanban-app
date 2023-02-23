import { useRegisterUserMutation } from 'redux/api/users';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [addUser, { isLoading }] = useRegisterUserMutation();

  return <RegisterForm onSubmit={addUser} isLoading={isLoading} />;
};

export default Register;
