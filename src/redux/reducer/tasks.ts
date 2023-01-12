import { ITask, MapType } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTask, deleteTask } from 'redux/actions/tasks';

export interface ITasksState {
  adding: {
    [columnId: string]: boolean;
  };
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<ITask[]>) {
      action.payload && (state.entities = arrToMap(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state, action) => {
        state.adding[action.meta.arg.column.id] = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { payload: task } = action;
        state.entities[task.id] = task;
        state.adding[action.meta.arg.column.id] = false;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.deleting[action.meta.arg.id] = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleting[action.payload.id] = false;
        delete state.entities[action.payload.id];
      });
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

/* 
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
 */
