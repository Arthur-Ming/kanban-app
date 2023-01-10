import { IColumn, ICreateTaskBody, ISetTasksAction, ITask } from 'interfaces';
import { ADD_TASK, SET_TASKS, DELETE_TASK, REQUEST, SUCCESS } from 'redux/action-types';
import { AnyAction, Dispatch } from 'redux';
import { api, apiRoutes } from 'utils/api';

export const setTasks = (tasks: ITask[]): ISetTasksAction => ({
  type: SET_TASKS,
  tasks,
});

export const createTask =
  (column: IColumn, body: ICreateTaskBody) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: ADD_TASK + REQUEST, column });
    try {
      const task = await api.post(apiRoutes.tasks(column.boardId, column.id), body);
      dispatch({ type: ADD_TASK + SUCCESS, task, column });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

export const removeTask = (task: ITask) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: DELETE_TASK + REQUEST, task });
  try {
    await api.delete(apiRoutes.tasksById(task.boardId, task.columnId, task.id));
    dispatch({ type: DELETE_TASK + SUCCESS, task });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};
