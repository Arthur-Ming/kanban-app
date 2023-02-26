import { api, httpClient, apiRoutes } from './api';
import { addRefToTask, deleteRefToTask } from 'redux/reducer/columns';
import { addTask, updateTask, deleteTask } from 'redux/reducer/tasks';
import { getToken } from 'utils/cookies';

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: ({ column, body }) => {
        return httpClient.post({
          url: apiRoutes.tasks(column.boardId, column.id),
          body,
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
        return httpClient.put({
          url: apiRoutes.tasksById(task.boardId, task.columnId, task.id),
          body,
        });
      },
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateTask(data));
      },
    }),
    deleteTask: builder.mutation({
      query: (task) => {
        return httpClient.delete({
          url: apiRoutes.tasksById(task.boardId, task.columnId, task.id),
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
