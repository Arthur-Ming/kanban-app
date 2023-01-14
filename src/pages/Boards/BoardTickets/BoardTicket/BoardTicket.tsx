import { IBoard, IRequestState } from 'interfaces';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { RootState } from 'redux/reducer';
import { boardByIdSelector, boardsDeletingState } from 'redux/selectors/boards';
import { connect } from 'react-redux';
import BoardRemoval from 'pages/Boards/BoardRemoval';

type StateProps = {
  board: IBoard;
  deletingState: IRequestState;
};

type OwnProps = {
  boardId: string;
};

type Props = StateProps & OwnProps;

const BoardTicket = ({ board, deletingState }: Props) => {
  if (deletingState.failed) return <div>err</div>;

  return (
    <div className={styles.box}>
      {deletingState.loading && <div>Deleting</div>}
      {!deletingState.loading && (
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
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
  deletingState: boardsDeletingState(state, props),
});

export default connect(mapStateToProps)(BoardTicket);
