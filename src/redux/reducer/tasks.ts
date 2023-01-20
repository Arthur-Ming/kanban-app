import { ITask } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTask, deleteTask } from 'redux/actions/tasks';

export interface ITasksState {
  entities: { [taskId: string]: ITask };
}

const initialState: ITasksState = {
  entities: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks(state, action: PayloadAction<ITask[]>) {
      state.entities = Object.assign(state.entities, arrToMap(action.payload));
    },
  },
});

export const { addTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
