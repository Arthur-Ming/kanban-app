import { IColumn } from 'interfaces';
import { AiFillEdit as UpdateIcon } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

interface OwnProps {
  column: IColumn;
}

type Props = OwnProps;

const ColumnUpdateLink = ({ column }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.box} onMouseUp={() => navigate(`columns/${column.id}/update`)}>
      <h4 className={styles.title}>{column.title}</h4>
      <UpdateIcon className={styles.icon} />
    </div>
  );
};

export default ColumnUpdateLink;
