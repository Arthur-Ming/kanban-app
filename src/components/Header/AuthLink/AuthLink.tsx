import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from './user.svg';
import styles from './index.module.scss';
import { RootState } from 'redux/reducer';
import { ISession } from 'interfaces';
import { connect } from 'react-redux';
import { loggedUserSelector } from 'redux/selectors/session';

type StateProps = {
  loggedUser: ISession | null;
};

type Props = StateProps;

const AuthLink = ({ loggedUser }: Props) => {
  if (loggedUser)
    return (
      <span className={styles.box}>
        <span>{loggedUser.userName}</span>
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
  loggedUser: loggedUserSelector(state),
});

export default connect(mapStateToProps)(AuthLink);
