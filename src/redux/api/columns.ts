import { api, httpClient, columnRoutes, taskRoutes } from './api';
import { boardsApi } from './boards';

const columnsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation({
      query: ({ board, body }) => {
        const { getUrl, isProtected } = columnRoutes.columns;
        return httpClient.post({ url: getUrl(board.id), body, isProtected });
      },
      async onQueryStarted({ board }, { dispatch, queryFulfilled }) {
        try {
          const { data: createdColumn } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoardById', board.id, (draft) => {
              draft.columns[createdColumn.id] = createdColumn;
              draft.board?.columns.push(createdColumn.id);
            })
          );
        } catch (error) {}
      },
    }),
    updateColumn: builder.mutation({
      query: ({ column, body }) => {
        const { getUrl, isProtected } = columnRoutes.columnById;
        return httpClient.put({
          url: getUrl(column.boardId, column.id),
          body,
          isProtected,
        });
      },
      async onQueryStarted({ column, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData('loadBoardById', column.boardId, (draft) => {
            Object.assign(draft.columns[column.id], body);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    deleteColumn: builder.mutation({
      query: (column) => {
        const { getUrl, isProtected } = columnRoutes.columnById;
        return httpClient.delete({
          url: getUrl(column.boardId, column.id),
          isProtected,
        });
      },
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoardById', column.boardId, (draft) => {
              draft.board.columns = draft.board.columns.filter(
                (columnId) => columnId !== column.id
              );
              delete draft.columns[column.id];
            })
          );
        } catch (error) {}
      },
    }),
    tasksOrder: builder.mutation({
      query: ({ boardId, columnId, body }) => {
        const { getUrl, isProtected } = taskRoutes.order;
        return httpClient.put({
          url: getUrl(boardId, columnId),
          body,
          isProtected,
        });
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useTasksOrderMutation,
} = columnsApi;
