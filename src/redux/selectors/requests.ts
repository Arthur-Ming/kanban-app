import { RootState } from '../store';
import { selector, Selector } from '.';
import { IRequestState } from 'redux/reducer/requests';

const requestStateSelector: Selector<IRequestState> = (state, field) =>
  selector(state, 'requests')[field];

export const requestFetchingSelector = (state: RootState, resource: string) =>
  requestStateSelector(state, 'fetching')[resource];
