import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { BsKanbanFill as LogoIcon } from 'react-icons/bs';

const Logo = () => {
  return (
    <NavLink to="" className={styles.box}>
      <LogoIcon className={styles.icon} />
      <span className={styles.text}>
        Project <br /> Management App
      </span>
    </NavLink>
  );
};

export default Logo;
