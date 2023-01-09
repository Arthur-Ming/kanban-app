import AuthLink from './AuthLink';
import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.box}>
      <AuthLink />
    </header>
  );
};

export default Header;
