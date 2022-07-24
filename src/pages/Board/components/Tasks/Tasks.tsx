import Dragging from 'components/Dragging';
import { connect } from 'react-redux';
import { tasksOrderChange } from 'redux/actions';
import { RootState } from 'redux/reducer';
import { taskIdsSelector } from 'redux/selectors';

import Task from './Task';
import styles from './tasks.module.scss';

interface IProps {
  columnId: string;
  boardId: string;
  taskIds?: string[];
  cardSelect?: (columnId: string, order: number, taskId?: string) => void;
}

const Tasks = ({ boardId, columnId, taskIds, cardSelect }: IProps) => {
  return (
    <Dragging
      draggingElementSelector="[data-tasks-grab-handle]"
      parentSelector="[data-drag-tasks-parent]"
      onDropped={cardSelect}
    >
      <div data-drag-tasks-parent data-column-id={columnId} className={styles.list}>
        {taskIds &&
          taskIds.map((taskId: string) => (
            <Task key={taskId} taskId={taskId} columnId={columnId} boardId={boardId} />
          ))}
      </div>
    </Dragging>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; boardId: string; columnId: string; order: number }) => void,
  props: IProps
) => ({
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

const mapStateToProps = (state: RootState, props: IProps) => ({
  taskIds: taskIdsSelector(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
