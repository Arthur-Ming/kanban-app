import { IColumn, ISetColumnsAction } from 'interfaces';
import { SET_COLUMNS } from 'redux/action-types';

export const setColumns = (columns: IColumn[]): ISetColumnsAction => ({
  type: SET_COLUMNS,
  columns,
});
