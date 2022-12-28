import { IAddTaskAction, ICreateTaskBody, ISetTasksAction, ITask } from 'interfaces';
import { ADD_TASK, SET_TASKS } from 'redux/action-types';
import { AnyAction, Dispatch } from 'redux';
import { api, apiRoutes, buildURL } from 'utils/api';
import { requestKey } from 'utils/requestService';
import { requestFailure, requestPending, requestSuccess } from './requests';

export const setTasks = (tasks: ITask[]): ISetTasksAction => ({
  type: SET_TASKS,
  tasks,
});

export const addTask = (task: ITask): IAddTaskAction => ({
  type: ADD_TASK,
  task,
});

export const createTask =
  (boardId: string, columnId: string, body: ICreateTaskBody) =>
  async (dispatch: Dispatch<AnyAction>) => {
    const route = apiRoutes.tasks(boardId, columnId);
    const key = requestKey.create(route);

    dispatch(requestPending(key));

    try {
      const data = await api.post(buildURL(route), body);

      dispatch(addTask(data));
      dispatch(requestSuccess(key));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(requestFailure(key, err.message));
      }
    }
  };
