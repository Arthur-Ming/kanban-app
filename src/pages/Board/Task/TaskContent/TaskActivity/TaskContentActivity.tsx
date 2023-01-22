import { IoIosList as ActivityIcon } from 'react-icons/io';
import styles from '../task-content.module.scss';

const TaskContentActivity = () => (
  <section className={styles.activity}>
    <ActivityIcon className={styles.icon} />
    <h3 className={styles.subtitle}>Activity</h3>
  </section>
);

export default TaskContentActivity;
