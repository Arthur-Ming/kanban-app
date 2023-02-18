import { ReactComponent as PlusIcon } from './plus-small.svg';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {
  label: string;
  path: string;
}

const CreationTicket = ({ path, label }: Props) => (
  <Link to={path} className={styles.label}>
    <span className={styles.box}>
      <PlusIcon className={styles.icon} />
      <span className={styles.text}>{label}</span>
    </span>
  </Link>
);

/* const CreationTicket = ({ path, label }: Props) => {
  const navigate = useNavigate();
  return (
    <a
      href={path}
      className={styles.label}
      onClick={(e) => e.preventDefault()}
      onMouseUp={() => {
        navigate(path);
      }}
    >
      <span className={styles.box}>
        <PlusIcon className={styles.icon} />
        <span className={styles.text}>{label}</span>
      </span>
    </a>
  );
}; */

export default CreationTicket;
