import { IBoard } from 'interfaces';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import BoardRemoval from 'pages/Boards/BoardRemoval';

type OwnProps = {
  board: IBoard;
};

type Props = OwnProps;

const BoardTicket = ({ board }: Props) => {
  return (
    <div className={styles.box}>
      <Link className={styles.link} to={board.id}>
        <span className={styles.title}>{board.title}</span>
        <span className={styles.description}>{board.description}</span>
      </Link>
      <BoardRemoval board={board} />
    </div>
  );
};

export default BoardTicket;
