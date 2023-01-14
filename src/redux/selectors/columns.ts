import { createSelector } from 'reselect';
import { RootState } from '../store';
import { IColumnsState } from '../reducer/columns';
import { createRequestStates, selector, Selector } from '.';

const columnsStateSelector: Selector<IColumnsState> = (state, field) =>
  selector(state, 'columns')[field];

const columnsSelector = (state: RootState) => columnsStateSelector(state, 'entities');

const columnsAddingSelector = (state: RootState) => columnsStateSelector(state, 'adding');

const columnsDeletingSelector = (state: RootState, { columnId }: { columnId: string }) =>
  columnsStateSelector(state, 'deleting')[columnId];

export const columnsAddingState = createSelector(columnsAddingSelector, createRequestStates);
export const columnsDeletingState = createSelector(columnsDeletingSelector, createRequestStates);

export const columnByIdSelector = (state: RootState, { columnId }: { columnId: string }) =>
  columnsSelector(state)[columnId];
