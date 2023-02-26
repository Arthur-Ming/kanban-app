import AuthLink from './AuthLink';
import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.box}>{/* <AuthLink isAuth={false} user={undefined} /> */}</div>
    </header>
  );
};

export default Header;
