import { createSelector } from 'reselect';
import { RootState } from '../store';
import { ITasksState } from '../reducer/tasks';

const tasksSelector = (state: RootState) => (<ITasksState>state.tasks).entities;
export const tasksListSelector = createSelector(tasksSelector, Object.values);
export const tasksLoadingSelector = (state: RootState, { columnId }: { columnId: string }) =>
  (<ITasksState>state.tasks).loading[columnId];
export const tasksLoadedSelector = (state: RootState, { columnId }: { columnId: string }) =>
  (<ITasksState>state.tasks).loaded[columnId];

export const taskByIdSelector = (state: RootState, { taskId = '' }: { taskId: string }) => {
  return tasksSelector(state)[taskId];
};
