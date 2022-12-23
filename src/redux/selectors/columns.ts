import { createSelector } from 'reselect';
import { RootState } from '../store';
import { IColumnsState } from '../reducer/columns';

const columnsSelector = (state: RootState) => (<IColumnsState>state.columns).entities;
export const columnsListSelector = createSelector(columnsSelector, Object.values);
export const columnsLoadingSelector = (state: RootState, { boardId }: { boardId: string }) =>
  (<IColumnsState>state.columns).loading[boardId];
export const columnsLoadedSelector = (state: RootState, { boardId }: { boardId: string }) =>
  (<IColumnsState>state.columns).loaded[boardId];

export const columnByIdSelector = (state: RootState, { columnId = '' }: { columnId?: string }) =>
  columnsSelector(state)[columnId];
