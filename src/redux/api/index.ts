import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addBoard,
  addBoards,
  deleteBoard,
  addRefToColumn,
  deleteRefToColumn,
  updateBoard,
} from 'redux/reducer/boards';
import { addColumn, deleteColumn, addColumns, updateColumn } from 'redux/reducer/columns';
import { addTasks } from 'redux/reducer/tasks';
import { separateBoard } from 'utils/separateBoard';
import { IBoard, IColumn, ICreateBoardBody, IPopulatedBoard, ITask } from '../../interfaces';
const baseUrl = 'http://localhost:8000';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loadBoards: builder.query<IBoard[], void>({
      query: () => `/boards`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoards(data));
      },
    }),
    loadBoardById: builder.query<{ tasks: ITask[]; columns: IColumn[]; board: IBoard }, string>({
      query: (boardId) => `/boards/${boardId}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data: populatedBoard } = await queryFulfilled;
        console.log(populatedBoard);
        const { tasks, columns, board } = populatedBoard;
        dispatch(addTasks(tasks));
        dispatch(addColumns(columns));
        dispatch(addBoard(board));
      },

      transformResponse: (response: IPopulatedBoard) => separateBoard(response),
    }),
    createBoard: builder.mutation<IBoard, ICreateBoardBody>({
      query: (body) => ({
        url: `/boards`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoard(data));
      },
    }),
    updateBoard: builder.mutation({
      query: ({ board, body }) => ({
        url: `/boards/${board.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body,
      }),
      async onQueryStarted({ board, body }, { dispatch, queryFulfilled }) {
        console.log(Object.assign({}, board, body));
        dispatch(updateBoard(Object.assign({}, board, body)));
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(updateBoard(board));
          throw err;
        }
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
    createColumn: builder.mutation({
      query: ({ board, body }) => ({
        url: `/boards/${board.id}/columns`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body,
      }),
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addRefToColumn(data));
        dispatch(addColumn(data));
      },
    }),
    updateColumn: builder.mutation({
      query: ({ column, body }) => ({
        url: `/boards/${column.boardId}/columns/${column.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body,
      }),
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateColumn(data));
      },
    }),
    deleteColumn: builder.mutation({
      query: (column) => ({
        url: `/boards/${column.boardId}/columns/${column.id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteRefToColumn(column));
        dispatch(deleteColumn(column));
      },
    }),
  }),
});

export const {
  useLoadBoardsQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useLoadBoardByIdQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} = api;
