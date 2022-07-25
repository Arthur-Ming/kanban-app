import { useParams } from 'react-router';
import styles from './styles.module.scss';
import Columns from './components/Columns';
import Loader from 'components/Loader';
import { IBoardWithColumnIds } from 'interfaces';
import { connect } from 'react-redux';
import { getBoardById } from 'redux/actions';
import { useEffect } from 'react';
import { boardLoadedSelector, boardLoadingSelector, boardSelector } from 'redux/selectors';
import NotFound from 'pages/NotFound';
import { RootState } from 'redux/store';

interface StateProps {
  board: IBoardWithColumnIds | null;
  loading: boolean;
  loaded: boolean;
}

interface DispatchProps {
  getBoardById: (boardId: string) => void;
}

type TProps = StateProps & DispatchProps;

const Board = ({ board, getBoardById, loading, loaded }: TProps) => {
  const { boardId } = useParams();
  useEffect(() => {
    if (!loading && !loaded && boardId) getBoardById(boardId);
  }, [loading, loaded, getBoardById, boardId]);

  if (loading) return <Loader />;
  if (!loaded || !boardId) return <NotFound />;

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{board?.title}</h4>
      <Columns boardId={boardId} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: boardLoadingSelector(state),
  loaded: boardLoadedSelector(state),
  board: boardSelector(state),
});

const mapDispatchToProps = {
  getBoardById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
