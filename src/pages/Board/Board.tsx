import { useParams } from 'react-router';
import styles from './styles.module.scss';
import Columns from './components/Columns';
import Loader from 'components/Loader';
import { IBoardWithColumnIds } from 'interfaces';
import { connect } from 'react-redux';
import { getAllColumns, getAllTasks, getBoardById } from 'redux/actions';
import { useEffect } from 'react';
import {
  boardByIdSelector,
  boardLoadedSelector,
  boardLoadingSelector,
  boardSelector,
  columnsLoadedSelector,
  columnsLoadingSelector,
  tasksLoadedSelector,
  tasksLoadingSelector,
} from 'redux/selectors';
import NotFound from 'pages/NotFound';
import { RootState } from 'redux/store';

interface OwnProps {
  boardId?: string;
}

interface StateProps {
  board: IBoardWithColumnIds | null;
  isBoardloading: boolean;
  isBoardloaded: boolean;
  isColumnsloading: boolean;
  isColumnsloaded: boolean;
  isTasksloading: boolean;
  isTasksloaded: boolean;
}

interface DispatchProps {
  getBoardById: (boardId: string) => void;
  getAllColumns: (boardId: string) => void;
  getAllTasks: (boardId: string) => void;
}

type TProps = StateProps & DispatchProps & OwnProps;

const Board = ({
  board,
  boardId,
  getBoardById,
  getAllColumns,
  getAllTasks,
  isBoardloading,
  isBoardloaded,
  isColumnsloading,
  isColumnsloaded,
  isTasksloading,
  isTasksloaded,
}: TProps) => {
  useEffect(() => {
    if (!isColumnsloading && !isColumnsloaded && boardId) getAllColumns(boardId);
  }, [isColumnsloaded, isColumnsloading, getAllColumns, boardId]);

  useEffect(() => {
    if (!isTasksloading && !isTasksloaded && boardId) getAllTasks(boardId);
  }, [isTasksloading, isTasksloaded, boardId, getAllTasks]);

  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(board);

  if (isColumnsloading || isTasksloading) return <Loader />;
  if (!isColumnsloaded && !isTasksloaded) return <NotFound />;
  if (!boardId) return <NotFound />;

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{board?.title}</h4>
      <Columns boardId={boardId} columnIds={board?.columnIds} />
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  isBoardloading: boardLoadingSelector(state),
  isBoardloaded: boardLoadedSelector(state),
  isColumnsloading: columnsLoadingSelector(state),
  isColumnsloaded: columnsLoadedSelector(state),
  isTasksloading: tasksLoadingSelector(state),
  isTasksloaded: tasksLoadedSelector(state),
  board: boardByIdSelector(state, props),
});

const mapDispatchToProps = {
  getBoardById,
  getAllColumns,
  getAllTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
