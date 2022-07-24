import { createSelector } from 'reselect';
import { RootState } from './reducer';
import { IBoardState } from './reducer/board';
import { IBoardsState } from './reducer/boards';

const boardsSelector = (state: RootState) => (<IBoardsState>state.boards).entities;

export const boardsListSelector = createSelector(boardsSelector, Object.values);

export const boardsLoadingSelector = (state: RootState) => (<IBoardsState>state.boards).loading;
export const boardsLoadedSelector = (state: RootState) => (<IBoardsState>state.boards).loaded;

export const boardSelector = (state: RootState) => (<IBoardState>state.board).entities;

export const boardLoadingSelector = (state: RootState) => (<IBoardState>state.board).loading;
export const boardLoadedSelector = (state: RootState) => (<IBoardState>state.board).loaded;

const columnsSelector = (state: RootState) => state.columns;

export const columnIdsSelector = (state: RootState) => boardSelector(state)?.columnIds;

export const columnByIdSelector = (state: RootState, { columnId = '' }: { columnId?: string }) =>
  columnsSelector(state)[columnId];

const tasksSelector = (state: RootState) => state.tasks;

export const taskIdsSelector = (state: RootState, { columnId }: { columnId: string }) => {
  return columnByIdSelector(state, { columnId }).taskIds;
};

export const taskByIdSelector = (state: RootState, { taskId }: { taskId: string }) => {
  return tasksSelector(state)[taskId];
};
