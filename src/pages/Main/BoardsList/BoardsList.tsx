import { IBoard } from 'interfaces';
import CreatBoard from './CreatBoard';
import BoardCard from './BoardCard';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { boardsListSelector, boardsLoadedSelector, boardsLoadingSelector } from 'redux/selectors';
import { useEffect } from 'react';
import { getAllBoards, resetBoard } from 'redux/actions';
import { IBoardsState } from 'redux/reducer/boards';
import Loader from 'components/Loader';
import { RootState } from 'redux/reducer';

interface IProps {
  boards: Omit<IBoard, 'columns'>[];
  loading: boolean;
  loaded: boolean;
  getAllBoards: () => void;
  resetBoard: () => void;
}

const BoardsList = ({ boards, getAllBoards, resetBoard, loading, loaded }: IProps) => {
  useEffect(() => {
    if (!loading && !loaded) getAllBoards();
  }, [loading, loaded, getAllBoards]);

  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  if (loading) return <Loader />;
  // if (!loaded) return 'No data :(';
  return (
    <div className={styles.container}>
      {boards.map(({ title, _id: id, description }) => (
        <BoardCard id={id} description={description} title={title} key={id} />
      ))}
      <CreatBoard />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  boards: boardsListSelector(state),
  loading: boardsLoadingSelector(state),
  loaded: boardsLoadedSelector(state),
});

const mapDispatchToProps = {
  getAllBoards,
  resetBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsList);
