import Loader from 'components/Loader';
import { IBoard } from 'interfaces';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import { getBoardById } from 'redux/actions/board';
import { RootState } from 'redux/reducer';
import { boardLoadingSelector, boardLoadedSelector, boardSelector } from 'redux/selectors/board';
import { routes } from 'utils/routes';
import BoardContent from './BoardContent';
import Task from './Task';

interface DispatchProps {
  getBoardById: (boardId: string) => void;
}

interface StateProps {
  isBoardloading: boolean;
  isBoardloaded: boolean;
  board: IBoard | null;
}

type Props = DispatchProps & StateProps;

const Board = ({ board, getBoardById, isBoardloading, isBoardloaded }: Props) => {
  const { boardId, taskId = null } = useParams();
  useEffect(() => {
    if (boardId) {
      getBoardById(boardId);
    }
  }, [getBoardById, boardId]);

  if (!boardId) return <NotFound />;
  if (isBoardloading) return <Loader />;
  if (!isBoardloaded) return <div>No data</div>;
  if (!board) return <div>No data</div>;

  return (
    <>
      <BoardContent board={board} />
      <Routes>
        {taskId && <Route path={routes.tasks.content.absolute()} element={<Task />} />}
      </Routes>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardloading: boardLoadingSelector(state),
  isBoardloaded: boardLoadedSelector(state),
  board: boardSelector(state),
});

const mapDispatchToProps = {
  getBoardById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
