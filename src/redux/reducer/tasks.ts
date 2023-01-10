import { IAddTaskAction, IDeleteTask, ISetTasksAction, ITask, MapType } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { ADD_TASK, DELETE_TASK, REQUEST, SET_TASKS, SUCCESS } from 'redux/action-types';

export interface ITasksState {
  adding: MapType<boolean>;
  updating: MapType<boolean>;
  deleting: MapType<boolean>;
  entities: MapType<ITask>;
}

const initialState: ITasksState = {
  adding: {},
  updating: {},
  deleting: {},
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_TASKS, (state, action) => {
      const { tasks } = <ISetTasksAction>action;
      tasks && (state.entities = arrToMap(tasks));
    })
    .addCase(ADD_TASK + REQUEST, (state, action) => {
      const { column } = <IAddTaskAction>action;
      state.adding[column.id] = true;
    })
    .addCase(ADD_TASK + SUCCESS, (state, action) => {
      const { task } = <IAddTaskAction>action;
      if (task) {
        state.adding[task.columnId] = false;
        state.entities[task.id] = task;
      }
    })
    .addCase(DELETE_TASK + REQUEST, (state, action) => {
      const { task } = <IDeleteTask>action;
      state.deleting[task.id] = true;
    })
    .addCase(DELETE_TASK + SUCCESS, (state, action) => {
      const { task } = <IDeleteTask>action;
      state.deleting[task.id] = false;
      delete state.entities[task.id];
    });
});
