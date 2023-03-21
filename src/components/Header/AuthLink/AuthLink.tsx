import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from './user.svg';
import styles from './index.module.scss';
import { ISession } from 'interfaces';

type Props = {
  loggedUser: ISession | null;
};

const AuthLink = ({ loggedUser }: Props) => {
  if (loggedUser)
    return (
      <span className={styles.box}>
        <span>{loggedUser.name}</span>
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
