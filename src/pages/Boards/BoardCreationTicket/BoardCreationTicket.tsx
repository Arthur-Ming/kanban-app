import CreationLabel from 'components/CreationLabel';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const BoardCreationTicket = () => (
  <Link to="create" className={styles.label}>
    <CreationLabel label="создать доску" />
  </Link>
);

export default BoardCreationTicket;
