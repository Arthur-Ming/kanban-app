import { RootState } from '../store';
import { IBoardState } from '../reducer/board';
import { selector, Selector } from '.';

const boardStateSelector: Selector<IBoardState> = (state, field) => selector(state, 'board')[field];

export const boardSelector = (state: RootState) => boardStateSelector(state, 'entities');

export const boardLoadingSelector = (state: RootState) => boardStateSelector(state, 'loading');
