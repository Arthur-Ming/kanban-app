import { Middleware } from 'redux';
import { RootState } from 'redux/reducer';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  COLUMNS_ORDER_CHANGE,
  LOAD_BOARD,
  LOAD_BOARDS,
  CREATE_TASK,
  TASKS_ORDER_CHANGE,
  DELETE_TASK,
  CREATE_COLUMN,
  DELETE_COLUMN,
  LOAD_COLUMNS,
  LOAD_TASKS,
} from '../constants';

const api: Middleware<Record<string, unknown>, RootState> = () => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { type, ...rest } = action;

  switch (type) {
    case LOAD_BOARD:
    case LOAD_BOARDS:
    case LOAD_COLUMNS:
    case LOAD_TASKS: {
      next({ ...rest, type: type + REQUEST });
      try {
        const res = await fetch(action.CallAPI);
        const data = await res.json();

        if (!res.ok) throw data;
        console.log(type);
        next({ ...rest, type: type + SUCCESS, data });
      } catch (error) {
        throw next({ ...rest, type: type + FAILURE, error });
      }
      break;
    }
    case COLUMNS_ORDER_CHANGE:
    case TASKS_ORDER_CHANGE: {
      fetch(action.CallAPI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ order: action.order }),
      });
      return next(action);
    }

    case CREATE_TASK: {
      const res = await fetch(action.CallAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ title: action.title }),
      });

      const newTask = await res.json();

      return next({ ...rest, type: type + SUCCESS, newTask });
    }
    case CREATE_COLUMN: {
      const res = await fetch(action.CallAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ title: action.title }),
      });

      const newColumn = await res.json();
      return next({ ...rest, type: type + SUCCESS, newColumn });
    }

    case DELETE_TASK:
    case DELETE_COLUMN: {
      fetch(action.CallAPI, {
        method: 'DELETE',
      });

      return next({ ...rest, type: type + SUCCESS });
    }
    default:
      return next(action);
  }
};

export default api;
