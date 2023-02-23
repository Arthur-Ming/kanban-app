import { RootState } from '../store';
import { selector, Selector } from '.';
import { IUsersState } from 'redux/reducer/users';

const usersStateSelector: Selector<IUsersState> = (state, field) => selector(state, 'users')[field];

export const userSelector = (state: RootState) => usersStateSelector(state, 'current');
