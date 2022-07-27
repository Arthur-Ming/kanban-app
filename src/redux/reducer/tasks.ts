import { IBoard, IColumn, ICreatTask, IGetAllTasks, ITask } from 'interfaces';
import {
  CREATE_TASK,
  DELETE_TASK,
  FAILURE,
  LOAD_COLUMNS,
  LOAD_TASKS,
  REQUEST,
  SUCCESS,
} from '../constants';
import { arrToMap } from 'utils/arrToMap';
import { pathRoutes } from 'utils/pathRoutes';
import { createReducer } from '@reduxjs/toolkit';

export interface ITasksState {
  loading: {
    [key: string]: boolean;
  };
  loaded: {
    [key: string]: boolean;
  };
  error: null;
  entities: {
    [key: string]: ITask;
  };
}

const initialState: ITasksState = {
  loading: {},
  loaded: {},
  error: null,
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_TASKS + REQUEST, (state, action) => {
      const { columnId } = <IGetAllTasks>action;
      state.loading[columnId] = true;
    })
    .addCase(LOAD_TASKS + SUCCESS, (state, action) => {
      const { data, columnId } = <IGetAllTasks>action;
      state.loading[columnId] = false;
      state.loaded[columnId] = true;
      state.error = null;
      data && (state.entities = { ...state.entities, ...arrToMap(data) });
    })
    .addCase(CREATE_TASK + SUCCESS, (state, action) => {
      const { newTask } = <ICreatTask>action;
      newTask && (state.entities[newTask._id] = newTask);
    });
});
