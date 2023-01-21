import { IColumn, ITask } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IColumnsState {
  entities: { [columnId: string]: IColumn };
}

const initialState: IColumnsState = {
  entities: {},
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumns(state, action: PayloadAction<IColumn[]>) {
      state.entities = Object.assign(state.entities, arrToMap(action.payload));
    },
    addColumn(state, action: PayloadAction<IColumn>) {
      const { payload: column } = action;
      state.entities[column.id] = column;
    },
    updateColumn(state, action: PayloadAction<IColumn>) {
      const { payload: column } = action;
      state.entities[column.id] = column;
    },
    deleteColumn(state, action: PayloadAction<IColumn>) {
      const { payload: column } = action;
      delete state.entities[column.id];
    },
    addRefToTask(state, action: PayloadAction<ITask>) {
      const { payload: task } = action;
      state.entities && state.entities[task.columnId].tasks.push(task.id);
    },
    deleteRefToTask(state, action: PayloadAction<ITask>) {
      const { payload: task } = action;
      state.entities[task.columnId].tasks = state.entities[task.columnId].tasks.filter(
        (taskId) => taskId !== task.id
      );
    },
  },
});

export const { addColumns, addColumn, deleteColumn, updateColumn, addRefToTask, deleteRefToTask } =
  columnsSlice.actions;
export default columnsSlice.reducer;
