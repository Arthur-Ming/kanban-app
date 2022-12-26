import { combineReducers } from 'redux';
import boards from './boards';
import board from './board';
import columns from './columns';
import tasks from './tasks';
import request from './request';

const rootReducer = combineReducers({
  boards,
  board,
  columns,
  tasks,
  request,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
