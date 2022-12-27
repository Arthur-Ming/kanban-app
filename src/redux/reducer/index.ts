import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import tasks from './tasks';
import requests from './requests';

const rootReducer = combineReducers({
  boards,
  columns,
  tasks,
  requests,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
