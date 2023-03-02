import { api, httpClient, columnRoutes, taskRoutes } from './api';
import { addRefToColumn, deleteRefToColumn } from 'redux/reducer/boards';
import { addColumn, deleteColumn, updateColumn, updateTasksOrder } from 'redux/reducer/columns';
import { RootState } from 'redux/store';
import { columnByIdSelector } from 'redux/selectors/columns';
import { updateTask } from 'redux/reducer/tasks';
import { taskByIdSelector } from 'redux/selectors/tasks';

const columnsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation({
      query: ({ board, body }) => {
        const { getUrl, isProtected } = columnRoutes.columns;
        return httpClient.post({ url: getUrl(board.id), body, isProtected });
      },
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addRefToColumn(data));
        dispatch(addColumn(data));
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
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateColumn(data));
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
        await queryFulfilled;
        dispatch(deleteRefToColumn(column));
        dispatch(deleteColumn(column));
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
      async onQueryStarted({ boardId, columnId, body }, { dispatch, getState, queryFulfilled }) {
        const state = <RootState>getState();
        const { source, destination, taskId } = body;
        if (columnId === destination.columnId) {
          const column = columnByIdSelector(state, { columnId });

          const newTasks = [...column.tasks];
          newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, taskId);

          dispatch(
            updateTasksOrder({
              columnId,
              newOrderedTasks: newTasks,
            })
          );
        }
        if (columnId !== destination.columnId) {
          const columnFrom = columnByIdSelector(state, { columnId });
          const columnTo = columnByIdSelector(state, { columnId: destination.columnId });

          const draggableTask = taskByIdSelector(state, { taskId });

          const newTasksFrom = [...columnFrom.tasks];
          newTasksFrom.splice(source.index, 1);

          const newTasksTo = [...columnTo.tasks];
          newTasksTo.splice(destination.index, 0, taskId);

          dispatch(
            updateTasksOrder({
              columnId,
              newOrderedTasks: newTasksFrom,
            })
          );
          dispatch(
            updateTasksOrder({
              columnId: destination.columnId,
              newOrderedTasks: newTasksTo,
            })
          );
          dispatch(updateTask({ ...draggableTask, columnId: destination.columnId }));
        }
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
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
