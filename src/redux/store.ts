import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import api from './middleware/api';
import tasksSelector from './middleware/tasksSelector';
import columnsSelector from './middleware/columnsSelector';

import reducer from './reducer';

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api, columnsSelector, tasksSelector),
  //  middleware: [api, columnsSelector, tasksSelector],
});
