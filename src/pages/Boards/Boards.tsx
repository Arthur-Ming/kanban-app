import BoardsList from './BoardsList';
import { connect } from 'react-redux';
import { getBoards } from 'redux/actions/boards';
import { RootState } from 'redux/reducer';
import {
  boardsLoadingSelector,
  boardsLoadedSelector,
  boardsListSelector,
} from 'redux/selectors/boards';
import { useEffect } from 'react';
import { IBoard } from 'interfaces';
import CreatBoard from './BoardsList/CreatBoard';
import styles from './index.module.scss';

interface DispatchProps {
  getBoards: () => void;
}

interface StateProps {
  isBoardsloading: boolean;
  isBoardsloaded: boolean;
  boards: IBoard[];
}

type Props = DispatchProps & StateProps;

const Boards = ({ getBoards, boards }: Props) => {
  useEffect(() => {
    getBoards();
  }, [getBoards]);

  return (
    <div className={styles.box}>
      <BoardsList boards={boards} />
      <CreatBoard />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardsloading: boardsLoadingSelector(state),
  isBoardsloaded: boardsLoadedSelector(state),
  boards: boardsListSelector(state),
});

const mapDispatchToProps = {
  getBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
