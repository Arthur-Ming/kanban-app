import { RootState } from '../store';
import { IBoardState } from '../reducer/board';
import { createRequestStates, selector, Selector } from '.';
import { createSelector } from '@reduxjs/toolkit';

const boardStateSelector: Selector<IBoardState> = (state, field) => selector(state, 'board')[field];

export const boardSelector = (state: RootState) => boardStateSelector(state, 'entities');

const boardLoadingSelector = (state: RootState) => boardStateSelector(state, 'loading');
const boardUpdatingSelector = (state: RootState) => boardStateSelector(state, 'updating');

export const boardColumnsSelector = (state: RootState) => boardSelector(state)?.columns;

export const boardLoadingState = createSelector(boardLoadingSelector, createRequestStates);
export const boardUpdatingState = createSelector(boardUpdatingSelector, createRequestStates);
