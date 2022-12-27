import { IColumn, ISetColumnsAction } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { SET_COLUMNS } from 'redux/action-types';

export interface IColumnsState {
  entities: {
    [key: string]: IColumn;
  };
}

const initialState: IColumnsState = {
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SET_COLUMNS, (state, action) => {
    const { columns } = <ISetColumnsAction>action;
    columns && (state.entities = arrToMap(columns));
  });
});
