import CreaterLabel from 'components/CreaterLabel';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const BoardCreaterTicket = () => (
  <Link to="create-board" className={styles.label}>
    <CreaterLabel label="создать доску" />
  </Link>
);

export default BoardCreaterTicket;
