import classNames from 'classnames';
import { IUserRegisterBody } from 'interfaces';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addUser } from 'redux/actions/users';
import { RootState } from 'redux/reducer';
import { userRegisteredSelector, userRegisteringSelector } from 'redux/selectors/users';
import RegisterForm from './RegisterForm';

type StateProps = {
  isUserRegistring: boolean;
  isUserRegistred: boolean;
};

type DispatchProps = {
  onSubmit: (userRegisterBody: IUserRegisterBody) => void;
};

type Props = StateProps & DispatchProps;

const Register = ({ isUserRegistring, isUserRegistred, onSubmit }: Props) => {
  useEffect(() => {
    if (isUserRegistred) {
      console.log('user registred');
    }
  }, [isUserRegistred]);

  if (isUserRegistring) {
    console.log('isUserRegistring');
  }

  return <RegisterForm onSubmit={onSubmit} isLoading={isUserRegistring} />;
};

const mapStateToProps = (state: RootState) => ({
  isUserRegistring: userRegisteringSelector(state),
  isUserRegistred: userRegisteredSelector(state),
});

const mapDispatchToProps = {
  onSubmit: addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
