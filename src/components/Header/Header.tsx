import AuthLink from './AuthLink';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.root}>
      <div>Header</div>
      <NavLink to="boards" className={styles.box}>
        <span>boards</span>
      </NavLink>
      <div className={styles.box}>{/* <AuthLink isAuth={false} user={undefined} /> */}</div>
    </header>
  );
};

export default Header;
