import styles from './styles.module.scss';
import Column from './Column';
import { connect } from 'react-redux';
import { columnIdsSelector } from 'redux/selectors';
import { RootState } from 'redux/reducer';
import Dragging from 'components/Dragging';
import { columnsOrderChange } from 'redux/actions';
import CreatColumn from '../CreatColumn';
import { Dispatch } from 'react';
import { IColumnsOrderChange } from 'interfaces';

interface StateProps {
  columnIds: string[] | undefined;
}

interface DispatchProps {
  columnsOrderChange: (columnId: string, order: number) => void;
}

interface OwnProps {
  boardId: string;
}

type TProps = StateProps & DispatchProps & OwnProps;

const Columns = ({ columnIds, boardId, columnsOrderChange }: TProps) => {
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

const mapStateToProps = (state: RootState) => ({
  columnIds: columnIdsSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IColumnsOrderChange>, { boardId }: OwnProps) => ({
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
