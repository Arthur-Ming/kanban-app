import { createSelector } from 'reselect';
import { RootState } from '../store';
import { ITasksState } from '../reducer/tasks';
import { selector, Selector } from '.';

const tasksStateSelector: Selector<ITasksState> = (state, field) => selector(state, 'tasks')[field];

const tasksSelector = (state: RootState) => tasksStateSelector(state, 'entities');

export const tasksListSelector = createSelector(tasksSelector, Object.values);

export const taskByIdSelector = (state: RootState, { taskId }: { taskId: string }) =>
  tasksSelector(state)[taskId];
