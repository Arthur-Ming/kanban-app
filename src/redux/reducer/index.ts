import { combineReducers } from 'redux';
import boards from './boards';
import board from './board';
import columns from './columns';
import tasks from './tasks';
import users from './users';
import session from './session';

const rootReducer = combineReducers({
  boards,
  board,
  columns,
  tasks,
  users,
  session,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
