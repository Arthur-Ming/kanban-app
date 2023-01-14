import { RequestState } from 'interfaces';
import { RootState } from '../store';

export type Selector<Y, T = RootState> = <F extends keyof Y>(state: T, field: F) => Y[F];

export const selector: Selector<RootState> = (state, field) => state[field];

export const createRequestStates = (requestState: RequestState) => ({
  idle: requestState === RequestState.idle,
  loading: requestState === RequestState.loading,
  loaded: requestState === RequestState.loaded,
  failed: requestState === RequestState.failed,
});
