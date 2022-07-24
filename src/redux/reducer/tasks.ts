import { IBoard, IColumn, ITask } from 'interfaces';
import { CREATE_TASK, DELETE_TASK, LOAD_COLUMNS, LOAD_TASKS, SUCCESS } from '../constants';
import { arrToMap } from 'utils/arrToMap';
import { pathRoutes } from 'utils/pathRoutes';

export interface IColumnsState {
  [key: string]: ITask;
}

const initialState: IColumnsState = {};

interface IAction {
  type: string;
  data?: ITask[];
  boardId: string;
  columnId: string;
  title: string;
  _id: string;
  description: string;
}

export default function (state = initialState, action: IAction) {
  const { type, data = [] } = action;

  switch (type) {
    case LOAD_TASKS:
      return data.reduce((acc, item) => {
        return { ...acc, [item._id]: item };
      }, {});
    case CREATE_TASK + SUCCESS: {
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
    }
    default:
      return state;
  }
}
