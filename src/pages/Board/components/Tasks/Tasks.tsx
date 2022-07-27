import Dragging from 'components/Dragging';
import Loader from 'components/Loader';
import { IColumnsOrderChange } from 'interfaces';
import NotFound from 'pages/NotFound';
import { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { getAllTasks, tasksOrderChange } from 'redux/actions';
import { RootState } from 'redux/reducer';
import { taskIdsSelector, tasksLoadedSelector, tasksLoadingSelector } from 'redux/selectors';
import Task from './Task';
import styles from './tasks.module.scss';

interface StateProps {
  taskIds: string[] | undefined;
  loading: boolean;
  loaded: boolean;
}

interface DispatchProps {
  cardSelect: (columnId: string, order: number, taskId?: string) => void;
  getAllTasks: () => void;
}

interface OwnProps {
  columnId: string;
  boardId: string;
}

type TProps = StateProps & DispatchProps & OwnProps;

const Tasks = ({
  boardId,
  columnId,
  taskIds,
  loading,
  loaded,
  cardSelect,
  getAllTasks,
}: TProps) => {
  useEffect(() => {
    if (!loading && !loaded && boardId) {
      getAllTasks();
    }
  }, [loading, loaded, getAllTasks, boardId]);

  if (loading) return <Loader />;
  if (!loaded) return <NotFound />;
  if (!taskIds || !taskIds.length) return <div>!!!</div>;

  return (
    <Dragging
      draggingElementSelector="[data-tasks-grab-handle]"
      parentSelector="[data-drag-tasks-parent]"
      onDropped={cardSelect}
    >
      <div data-drag-tasks-parent data-column-id={columnId} className={styles.list}>
        {taskIds.map((taskId: string) => (
          <Task key={taskId} taskId={taskId} columnId={columnId} />
        ))}
      </div>
    </Dragging>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: OwnProps) => ({
  getAllTasks: () => dispatch(getAllTasks(props.boardId, props.columnId)),
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
  loading: tasksLoadingSelector(state, props),
  loaded: tasksLoadedSelector(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
