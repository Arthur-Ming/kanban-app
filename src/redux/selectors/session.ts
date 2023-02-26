import { RootState } from '../store';
import { selector, Selector } from '.';
import { ISessionState } from 'redux/reducer/session';

const sessionStateSelector: Selector<ISessionState> = (state, field) =>
  selector(state, 'session')[field];

export const isUserAuthSelector = (state: RootState) => sessionStateSelector(state, 'loggedUser');
