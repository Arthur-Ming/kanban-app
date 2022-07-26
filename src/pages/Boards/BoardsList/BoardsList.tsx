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
import { Route, Routes } from 'react-router';
import Board from 'pages/Board';
import NotFound from 'pages/NotFound';

interface IProps {
  boards: IBoard[];
}

const BoardsList = ({ boards }: IProps) => {
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
