import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import tasks from './tasks';
import session from './session';
import { api } from '../api/api';

const rootReducer = combineReducers({
  boards,
  columns,
  tasks,
  session,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
