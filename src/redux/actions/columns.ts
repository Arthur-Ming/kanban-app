import { IAddColumnAction, IColumn, ICreateColumnBody, ISetColumnsAction } from 'interfaces';
import { AnyAction, Dispatch } from 'redux';
import { SET_COLUMNS, ADD_COLUMN } from 'redux/action-types';
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
