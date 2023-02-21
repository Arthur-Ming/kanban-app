import AuthLink from './AuthLink';
import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.box}>
        <AuthLink />
      </div>
    </header>
  );
};

export default Header;
