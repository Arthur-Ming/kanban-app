import { IBoard } from 'interfaces';
import { LOAD_BOARDS, REQUEST, FAILURE, SUCCESS } from '../constants';
import { arrToMap } from 'utils/arrToMap';

export interface IBoardsState {
  loading: boolean;
  loaded: boolean;
  error: null;
  entities: {
    [key: string]: IBoard;
  };
}

const initialState: IBoardsState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {},
};

interface IAction {
  type: string;
  error: unknown | null;
  data?: Omit<IBoard, 'columns'>[];
}

export default function (state = initialState, action: IAction) {
  const { type, error = null, data = [] } = action;

  switch (type) {
    case LOAD_BOARDS + REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_BOARDS + SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: arrToMap(data),
      };
    case LOAD_BOARDS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    default:
      return state;
  }
}
