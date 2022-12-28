import { IRequestAction } from 'interfaces';
import { FAILURE, FETCH, REQUEST, SUCCESS } from 'redux/action-types';

export const requestPending = (key: string): IRequestAction => ({
  type: FETCH + REQUEST,
  key,
  error: null,
});

export const requestSuccess = (key: string): IRequestAction => ({
  type: FETCH + SUCCESS,
  key,
  error: null,
});

export const requestFailure = (key: string, error: unknown): IRequestAction => ({
  type: FETCH + FAILURE,
  key,
  error,
});
