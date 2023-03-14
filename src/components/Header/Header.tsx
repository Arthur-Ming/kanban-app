import AuthLink from './AuthLink';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.box}>
        <Logo />
        <AuthLink />
      </div>
    </header>
  );
};

export default Header;
