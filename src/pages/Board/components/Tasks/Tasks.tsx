import Dragging from 'components/Dragging';
import { IColumnsOrderChange } from 'interfaces';
import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { tasksOrderChange } from 'redux/actions';
import { RootState } from 'redux/reducer';
import { taskIdsSelector } from 'redux/selectors';
import Task from './Task';
import styles from './tasks.module.scss';

interface StateProps {
  taskIds: string[] | undefined;
}

interface DispatchProps {
  cardSelect: (columnId: string, order: number, taskId?: string) => void;
}

interface OwnProps {
  columnId: string;
  boardId: string;
}

type TProps = StateProps & DispatchProps & OwnProps;

const Tasks = ({ columnId, taskIds, cardSelect }: TProps) => {
  return (
    <Dragging
      draggingElementSelector="[data-tasks-grab-handle]"
      parentSelector="[data-drag-tasks-parent]"
      onDropped={cardSelect}
    >
      <div data-drag-tasks-parent data-column-id={columnId} className={styles.list}>
        {taskIds &&
          taskIds.length &&
          taskIds.map((taskId: string) => (
            <Task key={taskId} taskId={taskId} columnId={columnId} />
          ))}
      </div>
    </Dragging>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IColumnsOrderChange>, props: OwnProps) => ({
  cardSelect: (columnId: string, order: number, taskId?: string) =>
    dispatch(
      tasksOrderChange({
        boardId: props.boardId,
        taskId: taskId ?? '',
        columnId,
        order,
      })
    ),
});

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  taskIds: taskIdsSelector(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
