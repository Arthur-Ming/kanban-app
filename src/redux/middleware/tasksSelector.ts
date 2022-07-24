import { ITask } from 'interfaces';
import { Middleware } from 'redux';
import { RootState } from 'redux/reducer';
import { LOAD_COLUMNS, LOAD_TASKS } from '../constants';

const foo: Middleware<Record<string, unknown>, RootState> = () => (next) => async (action) => {
  if (action.type === LOAD_COLUMNS) {
    const { data: columns, ...rest } = action;
    const tasks = columns.map(({ tasks }: { tasks: ITask[] | [] }) => tasks).flat();

    next({ ...rest, type: LOAD_TASKS, data: tasks });
  }
  next(action);
};

export default foo;
