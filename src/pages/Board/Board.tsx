import styles from './styles.module.scss';
import Columns from './components/Columns';
import { IBoard } from 'interfaces';
import { connect } from 'react-redux';
import { boardByIdSelector } from 'redux/selectors';
import NotFound from 'pages/NotFound';
import { RootState } from 'redux/store';

interface OwnProps {
  boardId?: string;
}

interface StateProps {
  board: IBoard | null;
}

type TProps = StateProps & OwnProps;

const Board = ({ board, boardId }: TProps) => {
  if (!boardId || !board) return <NotFound />;

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{board.title}</h4>
      <Columns boardId={boardId} />
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
});

export default connect(mapStateToProps)(Board);
