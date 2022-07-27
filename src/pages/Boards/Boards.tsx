import Loader from 'components/Loader';
import Board from 'pages/Board/Board';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import { getAllBoards } from 'redux/actions';
import { boardsLoadedSelector, boardsLoadingSelector } from 'redux/selectors';
import { RootState } from 'redux/store';
import BoardsList from './BoardsList';

interface StateProps {
  isBoardsloading: boolean;
  isBoardsloaded: boolean;
}

interface DispatchProps {
  getAllBoards: () => void;
}

type TProps = StateProps & DispatchProps;

const Boards = ({ isBoardsloading, isBoardsloaded, getAllBoards }: TProps) => {
  const { boardId = '' } = useParams();
  useEffect(() => {
    if (!isBoardsloading && !isBoardsloaded) getAllBoards();
  }, [isBoardsloading, isBoardsloaded, getAllBoards]);

  if (isBoardsloading) return <Loader />;
  if (!isBoardsloaded) return <NotFound />;

  return (
    <>
      <Routes>
        <Route path={``} element={<BoardsList />} />
      </Routes>
      <Routes>
        <Route path={`:boardId/*`} element={<Board boardId={boardId} />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardsloading: boardsLoadingSelector(state),
  isBoardsloaded: boardsLoadedSelector(state),
});

const mapDispatchToProps = {
  getAllBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
