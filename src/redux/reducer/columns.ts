import { IColumn } from 'interfaces';
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
  },
});

export const { addColumns, addColumn, deleteColumn, updateColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
