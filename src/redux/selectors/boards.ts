import { RootState } from '../store';
import { IBoardsState } from '../reducer/boards';
import { selector, Selector } from '.';
import { createSelector } from '@reduxjs/toolkit';

const boardsStateSelector: Selector<IBoardsState> = (state, field) =>
  selector(state, 'boards')[field];

const boardsSelector = (state: RootState) => boardsStateSelector(state, 'entities');

export const boardsLoadingSelector = (state: RootState) => boardsStateSelector(state, 'loading');

export const boardsAddingSelector = (state: RootState) => boardsStateSelector(state, 'adding');

export const boardsDeletingSelector = (state: RootState, { boardId }: { boardId: string }) =>
  boardsStateSelector(state, 'deleting')[boardId];

export const boardsListSelector = createSelector(boardsSelector, Object.values);

export const boardIdsSelector = createSelector(boardsSelector, Object.keys);

export const boardByIdSelector = (state: RootState, { boardId }: { boardId: string }) =>
  boardsSelector(state)[boardId];
