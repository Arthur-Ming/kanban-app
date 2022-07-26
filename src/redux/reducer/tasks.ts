import { IBoard, IColumn, IGetAllTasks, ITask } from 'interfaces';
import {
  CREATE_TASK,
  DELETE_TASK,
  FAILURE,
  LOAD_COLUMNS,
  LOAD_TASKS,
  REQUEST,
  SUCCESS,
} from '../constants';
import { arrToMap } from 'utils/arrToMap';
import { pathRoutes } from 'utils/pathRoutes';

export interface ITasksState {
  loading: boolean;
  loaded: boolean;
  error: null;
  entities: {
    [key: string]: ITask;
  };
}

const initialState: ITasksState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {},
};

type IAction = IGetAllTasks;

export default function (state = initialState, action: IAction) {
  const { type, error, data } = action;
  console.log(data);

  switch (type) {
    case LOAD_TASKS + REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_TASKS + SUCCESS:
      if (!data) return state;
      return {
        loading: false,
        loaded: true,
        entities: arrToMap(data),
      };
    case LOAD_TASKS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    /*  case CREATE_TASK + SUCCESS: {
      const { boardId, columnId, title, _id, description } = action;
      return {
        ...state,
        [_id]: {
          boardId,
          columnId,
          title,
          _id,
          description,
        },
      };
    }
    case DELETE_TASK: {
      const { boardId, columnId, _id } = action;

      const stateCopy = { ...state };
      delete stateCopy[_id];
      return stateCopy;
    } */
    default:
      return state;
  }
}
