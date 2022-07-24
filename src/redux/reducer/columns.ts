import { IBoard, IColumn, IColumnWithTasks, ITask } from 'interfaces';
import {
  CREATE_COLUMN,
  CREATE_TASK,
  DELETE_COLUMN,
  DELETE_TASK,
  LOAD_COLUMNS,
  SUCCESS,
} from '../constants';
import { arrToMap } from 'utils/arrToMap';

interface g extends IColumn {
  tasks: ITask[];
}

export interface IColumnsState {
  [key: string]: IColumnWithTasks;
}

const initialState: IColumnsState = {};

interface IAction {
  type: string;
  data?: g[];
  _id: string;
  columnId?: string;
  boardId: string;
  title: string;
  order: number;
}

export default function (state = initialState, action: IAction) {
  const { type, data = [] } = action;

  switch (type) {
    case LOAD_COLUMNS:
      return data
        .map(({ _id, boardId, title, order, tasks }) => ({
          _id,
          boardId,
          title,
          order,
          taskIds: tasks.map((task) => task._id),
        }))
        .reduce((acc, item) => ({ ...acc, [item._id]: item }), {});
    case CREATE_COLUMN + SUCCESS:
      const { boardId, title, _id, order } = action;

      return {
        ...state,
        [_id]: {
          boardId,
          title,
          _id,
          order,
          taskIds: [],
        },
      };
    case CREATE_TASK + SUCCESS: {
      const { _id = '', columnId = '', boardId = '' } = action;

      if (!_id && !columnId && !boardId) return state;
      console.log(state[columnId].taskIds);
      console.log(columnId);
      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          taskIds: [...state[columnId].taskIds, _id],
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
      const { _id = '', columnId = '', boardId = '' } = action;

      if (!_id && !columnId && !boardId) return state;

      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          taskIds: state[columnId].taskIds.filter((taskIds) => taskIds !== _id),
        },
      };
    }
    default:
      return state;
  }
}
