import {
  IAddColumnAction,
  IColumn,
  ICreateColumnBody,
  IDeleteColumn,
  ISetColumnsAction,
} from 'interfaces';
import { AnyAction, Dispatch } from 'redux';
import { SET_COLUMNS, ADD_COLUMN, DELETE_COLUMN } from 'redux/action-types';
import { api, apiRoutes, buildURL } from 'utils/api';
import { requestKey } from 'utils/requestService';
import { requestFailure, requestPending, requestSuccess } from './requests';

export const setColumns = (columns: IColumn[]): ISetColumnsAction => ({
  type: SET_COLUMNS,
  columns,
});

export const addColumn = (column: IColumn): IAddColumnAction => ({
  type: ADD_COLUMN,
  column,
});

export const deleteColumn = (boardId: string, columnId: string): IDeleteColumn => ({
  type: DELETE_COLUMN,
  boardId,
  columnId,
});

export const createColumn =
  (boardId: string, body: ICreateColumnBody) => async (dispatch: Dispatch<AnyAction>) => {
    const route = apiRoutes.columns(boardId);
    const key = requestKey.create(route);

    dispatch(requestPending(key));

    try {
      const data = await api.post(buildURL(route), body);
      console.log(data);
      dispatch(addColumn(data));
      dispatch(requestSuccess(key));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(requestFailure(key, err.message));
      }
    }
  };

export const removeColumn =
  (boardId: string, columnId: string) => async (dispatch: Dispatch<AnyAction>) => {
    const route = apiRoutes.columnById(boardId, columnId);
    const key = requestKey.delete(route);

    dispatch(requestPending(key));
    try {
      dispatch(deleteColumn(boardId, columnId));
      await api.delete(buildURL(route));
      dispatch(requestSuccess(key));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(requestFailure(key, err.message));
      }
    }
  };
