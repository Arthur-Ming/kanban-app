import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from './user.svg';
import styles from './index.module.scss';

const AuthLink = () => {
  /*  if (isAuth)
    return (
      <span className={styles.box} onClick={signOut}>
        {userName && <span>{userName}</span>}
        <UserIcon className={styles.icon} />
      </span>
    ); */

  return (
    <NavLink to="register" className={styles.box}>
      <span className={styles.text}>войти</span>
      <UserIcon className={styles.icon} />
    </NavLink>
  );
};

export default AuthLink;
