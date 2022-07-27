import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import tasks from './tasks';

const rootReducer = combineReducers({
  boards,
  columns,
  tasks,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
