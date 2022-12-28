import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import ColumnCreation from '../ColumnCreation';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { getBoardById } from 'redux/actions/boards';
import { useEffect } from 'react';
import { boardByIdSelector } from 'redux/selectors/boards';
import { AppDispatch } from 'redux/store';
import { requestFetchingSelector } from 'redux/selectors/requests';
import { baseRoutes, routes } from 'utils/routes';
import Loader from 'components/Loader';
import { Route, Routes, useParams } from 'react-router';
import Task from '../Task';

type OwnProps = {
  boardId: string;
};

type DispatchProps = {
  loadBoard: () => void;
};

type StateProps = {
  board: IBoard;
  loading?: boolean;
};

type Props = OwnProps & StateProps & DispatchProps;

const BoardContent = ({ board, loadBoard, loading }: Props) => {
  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{board?.title}</h4>
      <div className={styles.columns}>
        {board?.columnIds && <Columns columnIds={board.columnIds} />}
        <ColumnCreation />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
  loading: requestFetchingSelector(state, baseRoutes.boards.byId.absolute(props.boardId)),
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  loadBoard: () => dispatch(getBoardById(props.boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent);
