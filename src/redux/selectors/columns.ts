import { RootState } from '../store';
import { IColumnsState } from '../reducer/columns';
import { selector, Selector } from '.';

const columnsStateSelector: Selector<IColumnsState> = (state, field) =>
  selector(state, 'columns')[field];

const columnsSelector = (state: RootState) => columnsStateSelector(state, 'entities');

export const columnByIdSelector = (state: RootState, { columnId }: { columnId: string }) =>
  columnsSelector(state)[columnId];
