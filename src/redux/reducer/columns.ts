import { IColumn } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createColumn, deleteColumn, updateColumn } from 'redux/actions/columns';
import { createTask, deleteTask } from 'redux/actions/tasks';

export interface IColumnsState {
  adding: boolean;
  updating: { [columnId: string]: boolean };
  deleting: { [columnId: string]: boolean };
  entities: { [columnId: string]: IColumn };
}

const initialState: IColumnsState = {
  adding: false,
  updating: {},
  deleting: {},
  entities: {},
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<IColumn[]>) {
      action.payload && (state.entities = arrToMap(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createColumn.pending, (state) => {
        state.adding = true;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        const { payload: column } = action;
        state.entities[column.id] = column;
        state.adding = false;
      })
      .addCase(deleteColumn.pending, (state, action) => {
        state.deleting[action.meta.arg.id] = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.deleting[action.payload.id] = false;
        delete state.entities[action.payload.id];
      })
      .addCase(updateColumn.pending, (state, action) => {
        state.updating[action.meta.arg.column.id] = true;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        const { payload: column } = action;
        state.entities[column.id] = column;
        state.updating[action.meta.arg.column.id] = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { payload: task } = action;
        task && state.entities[task.columnId].tasks.push(task.id);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.entities[action.payload.columnId].tasks = state.entities[
          action.payload.columnId
        ].tasks.filter((taskId) => taskId !== action.payload.id);
      });
  },
});

export const { setColumns } = columnsSlice.actions;
export default columnsSlice.reducer;
