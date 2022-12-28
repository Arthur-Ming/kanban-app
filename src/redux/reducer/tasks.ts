import { IAddTaskAction, IDeleteTask, ISetTasksAction, ITask } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { ADD_TASK, DELETE_TASK, SET_TASKS } from 'redux/action-types';

export interface ITasksState {
  entities: {
    [key: string]: ITask;
  };
}

const initialState: ITasksState = {
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_TASKS, (state, action) => {
      const { tasks } = <ISetTasksAction>action;
      tasks && (state.entities = arrToMap(tasks));
    })
    .addCase(ADD_TASK, (state, action) => {
      const { task } = <IAddTaskAction>action;
      state.entities[task.id] = task;
    })
    .addCase(DELETE_TASK, (state, action) => {
      const { taskId } = <IDeleteTask>action;
      delete state.entities[taskId];
    });
});
