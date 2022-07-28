import {
  IBoard,
  IColumn,
  ICreatColumn,
  ICreatTask,
  IDeleteColumn,
  IDeleteTask,
  IGetAllColumns,
  ITask,
} from 'interfaces';
import {
  CREATE_COLUMN,
  CREATE_TASK,
  DELETE_COLUMN,
  DELETE_TASK,
  FAILURE,
  LOAD_COLUMNS,
  REQUEST,
  SUCCESS,
} from '../constants';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { truncate } from 'fs';

export interface IColumnsState {
  loading: {
    [key: string]: boolean;
  };
  loaded: {
    [key: string]: boolean;
  };
  error: null;
  entities: {
    [key: string]: IColumn;
  };
}

const initialState: IColumnsState = {
  loading: {},
  loaded: {},
  error: null,
  entities: {},
};

/* type IAction = IGetAllColumns | ICreatColumn | ICreatTask; */

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_COLUMNS + REQUEST, (state, action) => {
      const { boardId } = <IGetAllColumns>action;
      state.loading[boardId] = true;
    })
    .addCase(LOAD_COLUMNS + SUCCESS, (state, action) => {
      const { data, boardId } = <IGetAllColumns>action;
      state.loading[boardId] = false;
      state.loaded[boardId] = true;
      state.error = null;
      data && (state.entities = arrToMap(data));
    })
    .addCase(CREATE_COLUMN + SUCCESS, (state, action) => {
      const { newColumn } = <ICreatColumn>action;
      newColumn && (state.entities[newColumn._id] = newColumn);
    })
    .addCase(DELETE_COLUMN + SUCCESS, (state, action) => {
      const { columnId } = <IDeleteColumn>action;
      delete state.entities[columnId];
    })
    .addCase(CREATE_TASK + SUCCESS, (state, action) => {
      const { newTask, columnId } = <ICreatTask>action;
      newTask && state.entities[columnId].taskIds.push(newTask._id);
    })
    .addCase(DELETE_TASK + SUCCESS, (state, action) => {
      const { columnId, taskId } = <IDeleteTask>action;
      state.entities[columnId].taskIds = state.entities[columnId].taskIds.filter(
        (id) => id !== taskId
      );
    });
});
