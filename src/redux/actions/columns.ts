import { IColumn, ICreateColumnBody, ISetColumnsAction } from 'interfaces';
import { AnyAction, Dispatch } from 'redux';
import {
  SET_COLUMNS,
  ADD_COLUMN,
  DELETE_COLUMN,
  REQUEST,
  SUCCESS,
  UPDATE_COLUMN,
} from 'redux/action-types';
import { api, apiRoutes } from 'utils/api';

export const setColumns = (columns: IColumn[]): ISetColumnsAction => ({
  type: SET_COLUMNS,
  columns,
});

export const createColumn =
  (boardId: string, body: ICreateColumnBody) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: ADD_COLUMN + REQUEST });

    try {
      const column = await api.post(apiRoutes.columns(boardId), body);

      dispatch({ type: ADD_COLUMN + SUCCESS, column });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

export const removeColumn = (column: IColumn) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: DELETE_COLUMN + REQUEST, column });
  try {
    await api.delete(apiRoutes.columnById(column.boardId, column.id));
    dispatch({ type: DELETE_COLUMN + SUCCESS, column });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};

export const updateColumn =
  (column: IColumn, body: ICreateColumnBody) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: UPDATE_COLUMN + REQUEST, column });
    const { boardId, id } = column;
    try {
      const updatedColumn = await api.put(apiRoutes.columnById(boardId, id), body);
      dispatch({ type: UPDATE_COLUMN + SUCCESS, column: updatedColumn });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };
