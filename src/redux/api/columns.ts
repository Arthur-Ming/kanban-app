import { api, apiParams, apiRoutes } from './api';
import { addRefToColumn, deleteRefToColumn } from 'redux/reducer/boards';
import { addColumn, deleteColumn, updateColumn, updateTasksOrder } from 'redux/reducer/columns';
import { RootState } from 'redux/store';
import { columnByIdSelector } from 'redux/selectors/columns';
import { updateTask } from 'redux/reducer/tasks';
import { taskByIdSelector } from 'redux/selectors/tasks';

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
    tasksOrder: builder.mutation({
      query: ({ boardId, columnId, body }) =>
        apiParams.put(apiRoutes.columnById(boardId, columnId) + '/tasks', body),
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

        const { data } = await queryFulfilled;
        console.log(data);
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
