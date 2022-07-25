import {
  IBoard,
  IBoardWithColumnIds,
  IColumn,
  ICompleteBoard,
  ICreatColumn,
  IDeleteColumn,
  IGetBoardById,
} from 'interfaces';
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

type IBoardAction = IGetBoardById | ICreatColumn | IDeleteColumn;

const initialState: IBoardState = {
  loading: false,
  loaded: false,
  error: null,
  entities: null,
};

export default function (state = initialState, action: IBoardAction) {
  const { type, error, data } = <IGetBoardById>action;
  console.log(action);
  switch (type) {
    case LOAD_BOARD + REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_BOARD + SUCCESS:
      if (!data) return state;
      return {
        loading: false,
        loaded: true,
        entities: data,
      };
    case LOAD_BOARD + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    case CREATE_COLUMN + SUCCESS:
      const { newColumn } = <ICreatColumn>action;

      if (!newColumn) return state;
      if (!state.entities) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          columnIds: [...state.entities.columnIds, newColumn._id],
        },
      };

    case DELETE_COLUMN:
      const { columnId } = <IDeleteColumn>action;
      if (!columnId) return state;
      if (!state.entities) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          columnIds: state.entities.columnIds.filter((id) => columnId !== id),
        },
      };
    case RESET_BOARD: {
      return initialState;
    }
    default:
      return state;
  }
}
