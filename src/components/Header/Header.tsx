import AuthLink from './AuthLink';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from 'redux/selectors/session';

const Header = () => {
  const loggedUser = useSelector(loggedUserSelector);
  return (
    <header className={styles.root}>
      <div className={styles.box}>
        <Logo />
        <div className={styles.links}>
          {loggedUser && (
            <NavLink className={styles.boards_link} to="/boards">
              Boards
            </NavLink>
          )}
          <AuthLink loggedUser={loggedUser} />
        </div>
      </div>
    </header>
  );
};

export default Header;
