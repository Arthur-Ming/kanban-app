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

export default CreationTicket;
