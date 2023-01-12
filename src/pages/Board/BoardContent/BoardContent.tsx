import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import ColumnCreation from '../ColumnCreation';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { getBoardById } from 'redux/actions/board';
import { useEffect } from 'react';
import { AppDispatch } from 'redux/store';
import Loader from 'components/Loader';
import { Route, Routes } from 'react-router';
import CreationTicket from 'components/CreationTicket';
import { boardLoadingSelector, boardSelector } from 'redux/selectors/board';
import BoardHeader from './BoardHeader';

type OwnProps = {
  boardId: string;
};

type DispatchProps = {
  loadBoard: () => void;
};

type StateProps = {
  board: IBoard | null;
  loading: boolean;
};

type Props = OwnProps & StateProps & DispatchProps;

const BoardContent = ({ board, loadBoard, loading }: Props) => {
  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      {board && <BoardHeader board={board} />}
      <div className={styles.columns}>
        {board?.columns && <Columns columnIds={board.columns} />}
        <Routes>
          {board && <Route path="columns/create" element={<ColumnCreation board={board} />} />}
          <Route
            path="/*"
            element={<CreationTicket label="создать колонку" path="columns/create" />}
          />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  board: boardSelector(state),
  loading: boardLoadingSelector(state),
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  loadBoard: () => dispatch(getBoardById(props.boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent);
