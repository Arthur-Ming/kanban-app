import { IBoard, ICreateBoard, IGetAllBoards } from 'interfaces';
import { ADD_BOARD, LOAD_BOARDS, REQUEST, SET_BOARDS, SUCCESS } from '../action-types';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';

export interface IBoardsState {
  entities: { [key: string]: IBoard };
}

const initialState: IBoardsState = { entities: {} };

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_BOARDS, (state, action) => {
      const { data } = <IGetAllBoards>action;
      state.entities = arrToMap(data);
    })
    .addCase(ADD_BOARD + SUCCESS, (state, action: ICreateBoard) => {
      const { data } = action;
      data && (state.entities[data.id] = data);
    });
});
