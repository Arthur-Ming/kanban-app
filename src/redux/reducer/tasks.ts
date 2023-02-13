import { IFile, ITask } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    addTask(state, action: PayloadAction<ITask>) {
      const { payload: task } = action;
      state.entities[task.id] = task;
    },
    updateTask(state, action: PayloadAction<ITask>) {
      const { payload: task } = action;
      state.entities[task.id] = task;
    },
    deleteTask(state, action: PayloadAction<ITask>) {
      const { payload: task } = action;
      delete state.entities[task.id];
    },
    addRefToFile(state, action: PayloadAction<IFile>) {
      const { payload: file } = action;
      state.entities && state.entities[file.taskId].files.push(file.id);
    },
    deleteRefToFile(state, action: PayloadAction<IFile>) {
      const { payload: file } = action;
      state.entities[file.taskId].files = state.entities[file.taskId].files.filter(
        (fileId) => fileId !== file.id
      );
    },
  },
});

export const { addTasks, addTask, updateTask, deleteTask, addRefToFile, deleteRefToFile } =
  tasksSlice.actions;
export default tasksSlice.reducer;
