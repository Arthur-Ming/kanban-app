import { api, httpClient, taskRoutes } from './api';
import { boardsApi } from './boards';

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: ({ column, body }) => {
        const { getUrl, isProtected } = taskRoutes.tasks;
        return httpClient.post({
          url: getUrl(column.boardId, column.id),
          body,
          isProtected,
        });
      },
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoardById', data.boardId, (draft) => {
              draft.tasks[data.id] = data;
              draft.columns[data.columnId]?.tasks.push(data.id);
            })
          );
        } catch (error) {}
      },
    }),
    updateTask: builder.mutation({
      query: ({ task, body }) => {
        const { getUrl, isProtected } = taskRoutes.tasksById;
        return httpClient.put({
          url: getUrl(task.boardId, task.columnId, task.id),
          body,
          isProtected,
        });
      },
      async onQueryStarted({ task, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData('loadBoardById', task.boardId, (draft) => {
            Object.assign(draft.tasks[task.id], body);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (task) => {
        const { getUrl, isProtected } = taskRoutes.tasksById;
        return httpClient.delete({
          url: getUrl(task.boardId, task.columnId, task.id),
          isProtected,
        });
      },
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoardById', task.boardId, (draft) => {
              draft.columns[task.columnId].tasks = draft.columns[task.columnId].tasks.filter(
                (taskId) => taskId !== task.id
              );
              delete draft.tasks[task.id];
            })
          );
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;
