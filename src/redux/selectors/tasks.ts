import { createSelector } from 'reselect';
import { RootState } from '../store';
import { ITasksState } from '../reducer/tasks';
import { selector, Selector } from '.';
import { IColumn } from 'interfaces';

const tasksStateSelector: Selector<ITasksState> = (state, field) => selector(state, 'tasks')[field];

const tasksSelector = (state: RootState) => tasksStateSelector(state, 'entities');

export const tasksDeletingSelector = (state: RootState, { taskId }: { taskId: string }) =>
  tasksStateSelector(state, 'deleting')[taskId];

export const tasksAddingSelector = (state: RootState, { column }: { column: IColumn }) =>
  tasksStateSelector(state, 'adding')[column.id];

export const tasksListSelector = createSelector(tasksSelector, Object.values);

export const taskByIdSelector = (state: RootState, { taskId }: { taskId: string }) =>
  tasksSelector(state)[taskId];
