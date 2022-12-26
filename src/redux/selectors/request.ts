import { createSelector } from 'reselect';
import { RootState } from '../store';
import { selector, Selector } from '.';
import { IRequestState } from 'redux/reducer/request';

const requestStateSelector: Selector<IRequestState> = (state, field) =>
  selector(state, 'request')[field];

export const requestFetchingSelector = (state: RootState, resource: string) =>
  requestStateSelector(state, 'fetching')[resource];
