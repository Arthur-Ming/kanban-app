import BoardCreationForm from './BoardCreationForm';
import styles from './index.module.scss';

const BoardCreation = () => (
  <div className={styles.box}>
    <h4 className={styles.title}>Создать доску</h4>
    <BoardCreationForm />
  </div>
);

export default BoardCreation;
