import { RootState } from '../store';
import { IBoardState } from '../reducer/board';
import { selector, Selector } from '.';

const boardStateSelector: Selector<IBoardState> = (state, field) => selector(state, 'board')[field];

export const boardSelector = (state: RootState) => boardStateSelector(state, 'entitie');

export const boardLoadingSelector = (state: RootState) => boardStateSelector(state, 'loading');

export const boardLoadedSelector = (state: RootState) => boardStateSelector(state, 'loaded');
