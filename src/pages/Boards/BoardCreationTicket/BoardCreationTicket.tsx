import CreaterLabel from 'components/CreationLabel';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const BoardCreationTicket = () => (
  <Link to="create-board" className={styles.label}>
    <CreaterLabel label="создать доску" />
  </Link>
);

export default BoardCreationTicket;
