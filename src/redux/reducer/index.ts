import { combineReducers } from 'redux';

import boards from './boards';
import board from './board';
import columns from './columns';
import tasks from './tasks';

const rootReducer = combineReducers({
  boards,
  board,
  columns,
  tasks,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
