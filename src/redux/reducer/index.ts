import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import tasks from './tasks';
import session from './session';
import { api } from '../api/api';
import files from './files';

const rootReducer = combineReducers({
  boards,
  columns,
  tasks,
  files,
  session,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
