import { IColumn, MapType } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createColumn, deleteColumn, updateColumn } from 'redux/actions/columns';
import { createTask, deleteTask } from 'redux/actions/tasks';

export interface IColumnsState {
  adding: boolean;
  updating: MapType<boolean>;
  deleting: MapType<boolean>;
  entities: MapType<IColumn>;
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

/* 
export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_COLUMNS, (state, action) => {
      const { columns } = <ISetColumnsAction>action;
      columns && (state.entities = arrToMap(columns));
    })
    .addCase(ADD_COLUMN + REQUEST, (state) => {
      state.adding = true;
    })
    .addCase(ADD_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.entities[column.id] = column;
      state.adding = false;
    })
    .addCase(UPDATE_COLUMN + REQUEST, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.updating[column.id] = true;
    })
    .addCase(UPDATE_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IAddColumnAction>action;
      state.updating[column.id] = false;
      state.entities[column.id] = column;
    })
    .addCase(DELETE_COLUMN + REQUEST, (state, action) => {
      const { column } = <IDeleteColumn>action;
      state.deleting[column.id] = true;
    })
    .addCase(DELETE_COLUMN + SUCCESS, (state, action) => {
      const { column } = <IDeleteColumn>action;
      state.deleting[column.id] = false;
      delete state.entities[column.id];
    })
    .addCase(ADD_TASK + SUCCESS, (state, action) => {
      const { task } = <IAddTaskAction>action;
      task && state.entities[task.columnId].tasks.push(task.id);
    })
    .addCase(DELETE_TASK + SUCCESS, (state, action) => {
      const { task } = <IDeleteTask>action;
      state.entities[task.columnId].tasks = state.entities[task.columnId].tasks.filter(
        (id) => id !== task.id
      );
    });
});
 */
