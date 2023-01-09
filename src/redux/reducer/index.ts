import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import tasks from './tasks';
import requests from './requests';
import users from './users';

const rootReducer = combineReducers({
  boards,
  columns,
  tasks,
  requests,
  users,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
