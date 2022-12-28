import { useParams } from 'react-router';
import ColumnCreationForm from './ColumnCreationForm';
import styles from './index.module.scss';

const ColumnCreation = () => {
  const { boardId } = useParams();

  return <div className={styles.box}>{boardId && <ColumnCreationForm boardId={boardId} />}</div>;
};

export default ColumnCreation;
