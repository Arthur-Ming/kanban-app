import { IBoard } from 'interfaces';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { RootState } from 'redux/reducer';
import { boardByIdSelector, boardsDeletingSelector } from 'redux/selectors/boards';
import { connect } from 'react-redux';
import BoardRemoval from 'pages/Boards/BoardRemoval';

type StateProps = {
  board: IBoard;
  isDeleting: boolean;
};

type OwnProps = {
  boardId: string;
};

type Props = StateProps & OwnProps;

const BoardTicket = ({ board, isDeleting }: Props) => (
  <div className={styles.box}>
    {isDeleting && <div>Deleting</div>}
    {!isDeleting && (
      <>
        <Link className={styles.link} to={board.id}>
          <span className={styles.title}>{board.title}</span>
          <span className={styles.description}>{board.description}</span>
        </Link>
        <BoardRemoval board={board} />
      </>
    )}
  </div>
);

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
  isDeleting: boardsDeletingSelector(state, props),
});

export default connect(mapStateToProps)(BoardTicket);
