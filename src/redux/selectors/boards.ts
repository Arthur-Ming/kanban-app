import { RootState } from '../store';
import { IBoardsState } from '../reducer/boards';
import { createRequestStates, selector, Selector } from '.';
import { createSelector } from '@reduxjs/toolkit';

const boardsStateSelector: Selector<IBoardsState> = (state, field) =>
  selector(state, 'boards')[field];

const boardsSelector = (state: RootState) => boardsStateSelector(state, 'entities');
const boardsLoadingSelector = (state: RootState) => boardsStateSelector(state, 'loading');
const boardsAddingSelector = (state: RootState) => boardsStateSelector(state, 'adding');
const boardsDeletingSelector = (state: RootState, { boardId }: { boardId: string }) =>
  boardsStateSelector(state, 'deleting')[boardId];

export const boardsFetchingState = createSelector(boardsLoadingSelector, createRequestStates);
export const boardsAddingState = createSelector(boardsAddingSelector, createRequestStates);
export const boardsDeletingState = createSelector(boardsDeletingSelector, createRequestStates);

export const boardsListSelector = createSelector(boardsSelector, Object.values);

export const boardIdsSelector = createSelector(boardsSelector, Object.keys);

export const boardByIdSelector = (state: RootState, { boardId }: { boardId: string }) =>
  boardsSelector(state)[boardId];
