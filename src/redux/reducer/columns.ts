import { IAddColumnAction, IAddTaskAction, IColumn, ISetColumnsAction } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { ADD_COLUMN, ADD_TASK, SET_COLUMNS } from 'redux/action-types';

export interface IColumnsState {
  entities: {
    [key: string]: IColumn;
  };
}

const initialState: IColumnsState = {
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_COLUMNS, (state, action) => {
      const { columns } = <ISetColumnsAction>action;
      columns && (state.entities = arrToMap(columns));
    })
    .addCase(ADD_COLUMN, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.entities[column.id] = column;
    })
    .addCase(ADD_TASK, (state, action) => {
      const { task } = <IAddTaskAction>action;
      state.entities[task.columnId].tasks.push(task.id);
    });
});
