import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addBoard, setBoards, deleteBoard } from 'redux/reducer/boards';
import { IBoard } from '../../interfaces';
const baseUrl = 'http://localhost:8000';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loadBoards: builder.query<IBoard[], void>({
      query: () => `/boards`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setBoards(data));
      },
    }),
    createBoard: builder.mutation({
      query: (body) => ({
        url: `/boards`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body,
      }),
      async onQueryStarted(board, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoard(data));
      },
    }),
    deleteBoard: builder.mutation({
      query: (board) => ({
        url: `/boards/${board.id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(board, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteBoard(board));
      },
    }),
  }),
});

export const { useLoadBoardsQuery, useDeleteBoardMutation, useCreateBoardMutation } = api;
