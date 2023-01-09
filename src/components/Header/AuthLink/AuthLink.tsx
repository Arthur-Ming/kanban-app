import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from './user.svg';
import styles from './index.module.scss';
import { isUserAuthSelector } from 'redux/selectors/session';
import { RootState } from 'redux/reducer';
import { userSelector } from 'redux/selectors/users';
import { connect } from 'react-redux';
import { IUser } from 'interfaces';

type StateProps = {
  isAuth: boolean;
  user: IUser;
};

type Props = StateProps;

const AuthLink = ({ isAuth, user }: Props) => {
  if (isAuth)
    return (
      <span className={styles.box}>
        {user.name && <span>{user.name}</span>}
        <UserIcon className={styles.icon} />
      </span>
    );

  return (
    <NavLink to="login" className={styles.box}>
      <span className={styles.text}>войти</span>
      <UserIcon className={styles.icon} />
    </NavLink>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuth: isUserAuthSelector(state),
  user: userSelector(state),
});

export default connect(mapStateToProps)(AuthLink);
