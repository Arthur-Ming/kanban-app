import { api, apiParams, apiRoutes } from './api';
import { addRefToColumn, deleteRefToColumn } from 'redux/reducer/boards';
import { addColumn, deleteColumn, updateColumn } from 'redux/reducer/columns';

const columnsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation({
      query: ({ board, body }) => apiParams.post(apiRoutes.columns(board.id), body),
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addRefToColumn(data));
        dispatch(addColumn(data));
      },
    }),
    updateColumn: builder.mutation({
      query: ({ column, body }) =>
        apiParams.put(apiRoutes.columnById(column.boardId, column.id), body),

      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateColumn(data));
      },
    }),
    deleteColumn: builder.mutation({
      query: (column) => apiParams.delete(apiRoutes.columnById(column.boardId, column.id)),
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteRefToColumn(column));
        dispatch(deleteColumn(column));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateColumnMutation, useDeleteColumnMutation, useUpdateColumnMutation } =
  columnsApi;
