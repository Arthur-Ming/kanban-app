import { IBoard } from 'interfaces';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import BoardRemoval from 'pages/Boards/BoardRemoval';

type OwnProps = {
  board: IBoard;
};

type Props = OwnProps;

const BoardTicket = ({ board }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.box}>
      <div className={styles.link} onClick={() => navigate(board.id)}>
        <h4 className={styles.title}>{board.title}</h4>
        <span className={styles.description}>{board.description}</span>
      </div>
      <div className={styles.remove}>
        <BoardRemoval board={board} />
      </div>
    </div>
  );
};

export default BoardTicket;
