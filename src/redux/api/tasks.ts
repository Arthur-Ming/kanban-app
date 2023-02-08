import { api, apiParams, apiRoutes } from './api';
import { addRefToTask, deleteRefToTask } from 'redux/reducer/columns';
import { addTask, updateTask, deleteTask } from 'redux/reducer/tasks';

const columnsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: ({ column, body }) => apiParams.post(apiRoutes.tasks(column.boardId, column.id), body),
      async onQueryStarted(column, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addRefToTask(data));
        dispatch(addTask(data));
      },
    }),
    updateTask: builder.mutation({
      query: ({ task, body }) =>
        apiParams.put(apiRoutes.tasksById(task.boardId, task.columnId, task.id), body),

      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateTask(data));
      },
    }),
    deleteTask: builder.mutation({
      query: (task) => apiParams.delete(apiRoutes.tasksById(task.boardId, task.columnId, task.id)),
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteRefToTask(task));
        dispatch(deleteTask(task));
      },
    }),
    filesUpload: builder.mutation({
      query: ({ task, file }) =>
        apiParams.fileUpload(
          apiRoutes.tasksById(task.boardId, task.columnId, task.id) + '/files-upload',
          file
        ),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useFilesUploadMutation,
} = columnsApi;
