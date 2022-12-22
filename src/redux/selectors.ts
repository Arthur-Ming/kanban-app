import { createSelector } from 'reselect';
import { RootState } from './store';

import { IBoardsState } from './reducer/boards';
import { IColumnsState } from './reducer/columns';
import { ITasksState } from './reducer/tasks';

const boardsSelector = (state: RootState) => (<IBoardsState>state.boards).entities;
export const boardsListSelector = createSelector(boardsSelector, Object.values);
export const boardsLoadingSelector = (state: RootState) => (<IBoardsState>state.boards).loading;
export const boardsLoadedSelector = (state: RootState) => (<IBoardsState>state.boards).loaded;

/* export const boardSelector = (state: RootState) => (<IBoardState>state.board).entities;
export const boardLoadingSelector = (state: RootState) => (<IBoardState>state.board).loading;
export const boardLoadedSelector = (state: RootState) => (<IBoardState>state.board).loaded; */

export const boardByIdSelector = (state: RootState, { boardId = '' }: { boardId?: string }) => {
  console.log(boardId);
  console.log(boardsSelector(state));
  return boardsSelector(state)[boardId];
};

const columnsSelector = (state: RootState) => (<IColumnsState>state.columns).entities;
export const columnsListSelector = createSelector(columnsSelector, Object.values);
export const columnsLoadingSelector = (state: RootState, { boardId }: { boardId: string }) =>
  (<IColumnsState>state.columns).loading[boardId];
export const columnsLoadedSelector = (state: RootState, { boardId }: { boardId: string }) =>
  (<IColumnsState>state.columns).loaded[boardId];
export const columnIdsSelector = (state: RootState, { boardId }: { boardId: string }) =>
  boardsSelector(state)[boardId]?.columnIds;

export const columnByIdSelector = (state: RootState, { columnId = '' }: { columnId?: string }) =>
  columnsSelector(state)[columnId];

const tasksSelector = (state: RootState) => (<ITasksState>state.tasks).entities;
export const tasksListSelector = createSelector(tasksSelector, Object.values);
export const tasksLoadingSelector = (state: RootState, { columnId }: { columnId: string }) =>
  (<ITasksState>state.tasks).loading[columnId];
export const tasksLoadedSelector = (state: RootState, { columnId }: { columnId: string }) =>
  (<ITasksState>state.tasks).loaded[columnId];
export const taskIdsSelector = (state: RootState, { columnId }: { columnId: string }) => {
  return columnByIdSelector(state, { columnId }).taskIds;
};

export const taskByIdSelector = (state: RootState, { taskId = '' }: { taskId: string }) => {
  return tasksSelector(state)[taskId];
};
