import {
  IAddColumnAction,
  IAddTaskAction,
  IColumn,
  IDeleteColumn,
  IDeleteTask,
  ISetColumnsAction,
  MapType,
} from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_COLUMN,
  ADD_TASK,
  DELETE_COLUMN,
  DELETE_TASK,
  REQUEST,
  SET_COLUMNS,
  SUCCESS,
} from 'redux/action-types';

export interface IColumnsState {
  adding: boolean;
  updating: MapType<boolean>;
  deleting: MapType<boolean>;
  entities: MapType<IColumn>;
}

const initialState: IColumnsState = {
  adding: false,
  updating: {},
  deleting: {},
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_COLUMNS, (state, action) => {
      const { columns } = <ISetColumnsAction>action;
      columns && (state.entities = arrToMap(columns));
    })
    .addCase(ADD_COLUMN + REQUEST, (state) => {
      state.adding = true;
    })
    .addCase(ADD_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.entities[column.id] = column;
      state.adding = false;
    })
    .addCase(DELETE_COLUMN + REQUEST, (state, action) => {
      const { column } = <IDeleteColumn>action;
      state.deleting[column.id] = true;
    })
    .addCase(DELETE_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IDeleteColumn>action;
      state.deleting[column.id] = false;
      delete state.entities[column.id];
    })
    .addCase(ADD_TASK + SUCCESS, (state, action) => {
      const { task } = <IAddTaskAction>action;
      task && state.entities[task.columnId].tasks.push(task.id);
    })
    .addCase(DELETE_TASK + SUCCESS, (state, action) => {
      const { task } = <IDeleteTask>action;
      state.entities[task.columnId].tasks = state.entities[task.columnId].tasks.filter(
        (id) => id !== task.id
      );
    });
});
