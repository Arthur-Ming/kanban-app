import { IColumn, RequestState } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createColumn, deleteColumn, updateColumn } from 'redux/actions/columns';
import { createTask, deleteTask } from 'redux/actions/tasks';

export interface IColumnsState {
  adding: RequestState;
  updating: { [columnId: string]: RequestState };
  deleting: { [columnId: string]: RequestState };
  entities: { [columnId: string]: IColumn };
}

const initialState: IColumnsState = {
  adding: RequestState.idle,
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
        state.adding = RequestState.loading;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        const { payload: column } = action;
        state.entities[column.id] = column;
        state.adding = RequestState.loaded;
      })
      .addCase(deleteColumn.pending, (state, action) => {
        state.deleting[action.meta.arg.id] = RequestState.loading;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.deleting[action.payload.id] = RequestState.loaded;
        delete state.entities[action.payload.id];
      })
      .addCase(updateColumn.pending, (state, action) => {
        state.updating[action.meta.arg.column.id] = RequestState.loading;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        const { payload: column } = action;
        state.entities[column.id] = column;
        state.updating[action.meta.arg.column.id] = RequestState.loaded;
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
