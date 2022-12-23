import { RootState } from '../store';
import { IBoardState } from '../reducer/board';

export const boardSelector = (state: RootState) => {
  return (<IBoardState>state.board).entitie;
};

export const boardLoadingSelector = (state: RootState) => {
  return (<IBoardState>state.board).loading;
};

export const boardLoadedSelector = (state: RootState) => {
  return (<IBoardState>state.board).loaded;
};
