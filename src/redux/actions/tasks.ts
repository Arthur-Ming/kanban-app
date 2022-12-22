import { ISetTasksAction, ITask } from 'interfaces';
import { SET_TASKS } from 'redux/action-types';

export const setTasks = (tasks: ITask[]): ISetTasksAction => ({
  type: SET_TASKS,
  tasks,
});
