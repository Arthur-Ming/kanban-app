import { IBoard, IColumn, IGetAllColumns, ITask } from 'interfaces';
import {
  CREATE_COLUMN,
  CREATE_TASK,
  DELETE_COLUMN,
  DELETE_TASK,
  FAILURE,
  LOAD_COLUMNS,
  REQUEST,
  SUCCESS,
} from '../constants';
import { arrToMap } from 'utils/arrToMap';

export interface IColumnsState {
  loading: boolean;
  loaded: boolean;
  error: null;
  entities: {
    [key: string]: IColumn;
  };
}

const initialState: IColumnsState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {},
};

type IAction = IGetAllColumns;

export default function (state = initialState, action: IAction) {
  const { type, error, data } = action;
  console.log(data);
  switch (type) {
    case LOAD_COLUMNS + REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_COLUMNS + SUCCESS:
      if (!data) return state;
      return {
        loading: false,
        loaded: true,
        entities: arrToMap(data),
      };
    case LOAD_COLUMNS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    /*  case CREATE_COLUMN + SUCCESS:
      if (!newColumn) return state;

      return {
        ...state,
        [newColumn._id]: {
          ...newColumn,
          taskIds: [],
        },
      };
    case CREATE_TASK + SUCCESS: {
      const { taskId = '', columnId = '', boardId = '' } = action;

      if (!taskId && !columnId && !boardId) return state;

      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          taskIds: [...state[columnId].taskIds, taskId],
        },
      };
    }

    case DELETE_COLUMN: {
      const { columnId = '', boardId = '' } = action;

      if (!columnId && !boardId) return state;
      const stateCopy = { ...state };
      delete stateCopy[columnId];
      return stateCopy;
    }

    case DELETE_TASK: {
      const { taskId = '', columnId = '', boardId = '' } = action;

      if (!taskId && !columnId && !boardId) return state;

      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          taskIds: state[columnId].taskIds.filter((id) => id !== taskId),
        },
      };
    } */
    default:
      return state;
  }
}
