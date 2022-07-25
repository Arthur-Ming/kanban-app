import { IBoard, IColumn, IColumnWithTaskIds, ITask } from 'interfaces';
import {
  CREATE_COLUMN,
  CREATE_TASK,
  DELETE_COLUMN,
  DELETE_TASK,
  LOAD_COLUMNS,
  SUCCESS,
} from '../constants';
import { arrToMap } from 'utils/arrToMap';

interface IColumnWithTasks extends IColumn {
  tasks: ITask[];
}

export interface IColumnsState {
  [key: string]: IColumnWithTaskIds;
}

const initialState: IColumnsState = {};

interface IAction {
  type: string;
  data?: IColumnWithTasks[];
  taskId: string;
  columnId?: string;
  boardId: string;
  title: string;
  order: number;
  newColumn: IColumn | null;
}

export default function (state = initialState, action: IAction) {
  const { type, data = [], newColumn = null } = action;

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
    }
    default:
      return state;
  }
}
