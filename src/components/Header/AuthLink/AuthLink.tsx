import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from './user.svg';
import styles from './index.module.scss';

import { IUser } from 'interfaces';

type StateProps = {
  isAuth: boolean;
  user?: IUser;
};

type Props = StateProps;

const AuthLink = ({ isAuth, user }: Props) => {
  if (isAuth)
    return (
      <span className={styles.box}>
        {user?.name && <span>{user.name}</span>}
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

export default AuthLink;
