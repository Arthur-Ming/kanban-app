import { createSelector } from 'reselect';
import { RootState } from '../store';
import { IBoardsState } from '../reducer/boards';
import { selector, Selector } from '.';

const boardsStateSelector: Selector<IBoardsState> = (state, field) =>
  selector(state, 'boards')[field];

const boardsSelector = (state: RootState) => boardsStateSelector(state, 'entities');

export const boardsListSelector = createSelector(boardsSelector, Object.values);

export const boardIdsSelector = createSelector(boardsSelector, Object.keys);

export const boardByIdSelector = (state: RootState, { boardId }: { boardId: string }) =>
  boardsSelector(state)[boardId];
