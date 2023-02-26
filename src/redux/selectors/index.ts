import { RootState } from '../store';

export type Selector<Y, T = RootState> = <F extends keyof Y>(state: T, field: F) => Y[F];

export const selector: Selector<RootState> = (state, field) => state[field];
