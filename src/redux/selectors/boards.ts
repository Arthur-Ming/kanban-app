import { createSelector } from 'reselect';
import { RootState } from '../store';
import { IBoardsState } from '../reducer/boards';

const boardsSelector = (state: RootState) => (<IBoardsState>state.boards).entities;

export const boardsListSelector = createSelector(boardsSelector, Object.values);

export const boardsLoadingSelector = (state: RootState) => (<IBoardsState>state.boards).loading;

export const boardsLoadedSelector = (state: RootState) => (<IBoardsState>state.boards).loaded;

export const boardByIdSelector = (state: RootState, { boardId = '' }: { boardId?: string }) => {
  return boardsSelector(state)[boardId];
};
