import { useParams } from 'react-router';
import styles from './styles.module.scss';
import Columns from './components/Columns';
import Loader from 'components/Loader';
import { IBoardWithColumnIds } from 'interfaces';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { getBoardById } from 'redux/actions';
import { useEffect } from 'react';
import { boardLoadedSelector, boardLoadingSelector, boardSelector } from 'redux/selectors';
import NotFound from 'pages/NotFound';
import CreatTask from './components/CreatTask';

interface IProps {
  board: IBoardWithColumnIds | null;
  loading: boolean;
  loaded: boolean;
  getBoardById: (boardId: string) => void;
}

const Board = ({ board, getBoardById, loading, loaded }: IProps) => {
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
