import { IBoard } from 'interfaces';
import { AiFillEdit as UpdateIcon } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

type Props = {
  board: IBoard;
};

const BoardUpdateLink = ({ board }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.box} onClick={() => navigate('update')}>
      <h4 className={styles.title}>{board.title}</h4>
      <UpdateIcon className={styles.icon} />
    </div>
  );
};

export default BoardUpdateLink;
