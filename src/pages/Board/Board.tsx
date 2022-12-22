import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import { getBoardById } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import { boardsLoadingSelector, boardsLoadedSelector } from 'redux/selectors';
import { routes } from 'utils/routes';
import BoardContent from './BoardContent';
import Task from './Task';

interface DispatchProps {
  getBoardById: (boardId: string) => void;
}

interface StateProps {
  isBoardloading: boolean;
  isBoardloaded: boolean;
}

type Props = DispatchProps & StateProps;

const Board = ({ getBoardById, isBoardloading, isBoardloaded }: Props) => {
  const { boardId, taskId = null } = useParams();

  useEffect(() => {
    if (boardId) {
      getBoardById(boardId);
    }
  }, [getBoardById, boardId]);

  if (!boardId) return <NotFound />;
  if (isBoardloading) return <Loader />;
  if (!isBoardloaded) return <div>No data</div>;

  return (
    <>
      <BoardContent boardId={boardId} />
      <Routes>
        {taskId && <Route path={routes.tasks.content.absolute()} element={<Task />} />}
      </Routes>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardloading: boardsLoadingSelector(state),
  isBoardloaded: boardsLoadedSelector(state),
});

const mapDispatchToProps = {
  getBoardById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
