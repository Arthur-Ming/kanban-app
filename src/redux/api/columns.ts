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
      query: ({ boardId, from, to, body }) => apiParams.put(apiRoutes.boardById(boardId), body),
      async onQueryStarted({ boardId, from, to, body }, { dispatch, getState, queryFulfilled }) {
        const state = <RootState>getState();

        if (from === to) {
          const column = columnByIdSelector(state, { columnId: from });

          const newTasks = [...column.tasks];
          newTasks.splice(body.sourceIndex, 1);
          newTasks.splice(body.destinationIndex, 0, body.draggableId);

          dispatch(
            updateTasksOrder({
              columnId: from,
              newOrderedTasks: newTasks,
            })
          );
        }
        if (from !== to) {
          const columnFrom = columnByIdSelector(state, { columnId: from });
          const columnTo = columnByIdSelector(state, { columnId: to });
          const { draggableId } = body;
          const draggableTask = taskByIdSelector(state, { taskId: draggableId });

          const newTasksFrom = [...columnFrom.tasks];
          newTasksFrom.splice(body.sourceIndex, 1);

          const newTasksTo = [...columnTo.tasks];
          newTasksTo.splice(body.destinationIndex, 0, body.draggableId);

          dispatch(
            updateTasksOrder({
              columnId: from,
              newOrderedTasks: newTasksFrom,
            })
          );
          dispatch(
            updateTasksOrder({
              columnId: to,
              newOrderedTasks: newTasksTo,
            })
          );
          dispatch(updateTask({ ...draggableTask, columnId: to }));
        }

        await queryFulfilled;
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
