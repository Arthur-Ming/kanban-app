import { IBoard, IBoardWithColumnIds, ICompleteBoard } from 'interfaces';
import {
  LOAD_BOARD,
  REQUEST,
  FAILURE,
  SUCCESS,
  RESET_BOARD,
  CREATE_COLUMN,
  DELETE_COLUMN,
} from '../constants';

export interface IBoardState {
  loading: boolean;
  loaded: boolean;
  error: null;
  entities: IBoardWithColumnIds | null;
}

interface IBoardAction {
  type: string;
  error: unknown | null;
  data: ICompleteBoard;
  columnId: string;
  _id: string;
}

const initialState: IBoardState = {
  loading: false,
  loaded: false,
  error: null,
  entities: null,
};

export default function (state = initialState, action: IBoardAction) {
  const { type, error, data } = action;

  switch (type) {
    case LOAD_BOARD + REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_BOARD + SUCCESS:
      const { _id, title, description, columns } = data;
      return {
        loading: false,
        loaded: true,
        entities: {
          _id,
          title,
          description,
          columnIds: columns.map(({ _id }) => _id),
        },
      };
    case LOAD_BOARD + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    case CREATE_COLUMN + SUCCESS:
      const { _id: columnId } = action;

      if (!columnId) return state;
      if (!state.entities) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          columnIds: [...state.entities.columnIds, columnId],
        },
      };

    case DELETE_COLUMN:
      const { columnId: id } = action;
      if (!id) return state;
      if (!state.entities) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          columnIds: state.entities.columnIds.filter((columnId) => columnId !== id),
        },
      };
    case RESET_BOARD: {
      return initialState;
    }
    default:
      return state;
  }
}
