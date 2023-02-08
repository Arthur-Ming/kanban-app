import { IFile } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilesState {
  entities: { [fileId: string]: IFile };
}

const initialState: IFilesState = {
  entities: {},
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFiles(state, action: PayloadAction<IFile[]>) {
      state.entities = Object.assign(state.entities, arrToMap(action.payload));
    },
    addFile(state, action: PayloadAction<IFile>) {
      const { payload: file } = action;
      state.entities[file.id] = file;
    },

    deleteFile(state, action: PayloadAction<IFile>) {
      const { payload: file } = action;
      delete state.entities[file.id];
    },
  },
});

export const { addFiles, addFile, deleteFile } = filesSlice.actions;
export default filesSlice.reducer;
