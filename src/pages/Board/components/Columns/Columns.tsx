import styles from './styles.module.scss';
import Column from './Column';
import { connect } from 'react-redux';
import { columnIdsSelector, columnsLoadedSelector, columnsLoadingSelector } from 'redux/selectors';
import { RootState } from 'redux/reducer';
import Dragging from 'components/Dragging';
import { columnsOrderChange, getAllColumns } from 'redux/actions';
import CreatColumn from '../CreatColumn';
import { Dispatch, useEffect } from 'react';
import { IColumnsOrderChange, IGetAllColumns } from 'interfaces';
import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';

interface StateProps {
  columnIds: string[] | undefined;
  loading: boolean;
  loaded: boolean;
}

interface DispatchProps {
  columnsOrderChange: (columnId: string, order: number) => void;
  getAllColumns: () => void;
}

interface OwnProps {
  boardId: string;
}

type TProps = StateProps & DispatchProps & OwnProps;

const Columns = ({
  loading,
  loaded,
  columnIds,
  boardId,
  getAllColumns,
  columnsOrderChange,
}: TProps) => {
  useEffect(() => {
    if (!loading && !loaded && boardId) {
      console.log('getAllColumns');
      getAllColumns();
    }
  }, [loading, loaded, getAllColumns, boardId]);

  if (loading) return <Loader />;
  if (!loaded) return <NotFound />;

  return (
    <Dragging
      draggingElementSelector="[data-columns-grab-handle]"
      parentSelector="[data-drag-columns-parent]"
      onDropped={columnsOrderChange}
    >
      <div data-drag-columns-parent className={styles.container}>
        {columnIds &&
          columnIds?.length &&
          columnIds.map((columnId: string) => (
            <Column key={columnId} columnId={columnId} boardId={boardId} />
          ))}
        <CreatColumn />
      </div>
    </Dragging>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  columnIds: columnIdsSelector(state, props),
  loading: columnsLoadingSelector(state, props),
  loaded: columnsLoadedSelector(state, props),
});

const mapDispatchToProps = (
  dispatch: Dispatch<IColumnsOrderChange | IGetAllColumns>,
  { boardId }: OwnProps
) => ({
  getAllColumns: () => dispatch(getAllColumns(boardId)),
  columnsOrderChange: (columnId: string, order: number) =>
    dispatch(
      columnsOrderChange({
        boardId,
        columnId,
        order,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);
