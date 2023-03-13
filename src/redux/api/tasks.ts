import { api, httpClient, taskRoutes } from './api';
import { addRefToTask, deleteRefToTask } from 'redux/reducer/columns';
import { addTask, updateTask, deleteTask } from 'redux/reducer/tasks';

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
        const { data } = await queryFulfilled;
        dispatch(addRefToTask(data));
        dispatch(addTask(data));
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
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTask(data));
        } catch (error) {}
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
          dispatch(deleteRefToTask(task));
          dispatch(deleteTask(task));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;
