import { ReactComponent as PlusIcon } from './plus-small.svg';
import styles from './styles.module.scss';

interface IProps {
  label: string;
}

const CreationLabel = ({ label }: IProps) => (
  <span className={styles.box}>
    <PlusIcon className={styles.icon} />
    <span className={styles.text}>{label}</span>
  </span>
);
export default CreationLabel;
