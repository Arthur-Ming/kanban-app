import styles from './styles.module.scss';
import Column from './Column';
import { connect } from 'react-redux';
import { columnIdsSelector } from 'redux/selectors';
import { RootState } from 'redux/reducer';
import Dragging from 'components/Dragging';
import { columnsOrderChange } from 'redux/actions';
import { Dispatch } from 'redux';
import CreatTask from '../CreatTask';
import CreatColumn from '../CreatColumn';

interface StateProps {
  columnIds?: string[];
}

interface DispatchProps {
  columnsOrderChange?: (columnId: string, order: number) => void;
}

interface OwnProps {
  boardId: string;
}

type IProps = StateProps & DispatchProps & OwnProps;

const Columns = ({ columnIds, boardId, columnsOrderChange }: IProps) => {
  return (
    <Dragging
      draggingElementSelector="[data-columns-grab-handle]"
      parentSelector="[data-drag-columns-parent]"
      onDropped={columnsOrderChange}
    >
      <div data-drag-columns-parent className={styles.container}>
        {columnIds?.length &&
          columnIds.map((columnId: string) => (
            <Column key={columnId} columnId={columnId} boardId={boardId} />
          ))}
        <CreatColumn />
      </div>
    </Dragging>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  columnIds: columnIdsSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch, props: IProps) => ({
  columnsOrderChange: (columnId: string, order: number) =>
    dispatch(
      columnsOrderChange({
        boardId: props.boardId,
        columnId,
        order,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);
