import { createSelector } from 'reselect';
import { RootState } from '../store';
import { selector, Selector } from '.';
import { IFilesState } from 'redux/reducer/files';

const filesStateSelector: Selector<IFilesState> = (state, field) => selector(state, 'files')[field];

const filesSelector = (state: RootState) => filesStateSelector(state, 'entities');

export const filesListSelector = createSelector(filesSelector, Object.values);

export const fileByIdSelector = (state: RootState, { fileId }: { fileId: string }) =>
  filesSelector(state)[fileId];
