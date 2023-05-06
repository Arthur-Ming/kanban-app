import { api, httpClient } from './api';
import { boardsApi } from './boards';

const filesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      /* query: ({ task, file }) => {
        console.log(file);
        return httpClient.fileUpload({
          url: 'http://localhost:8000' + `/tasks/${task.id}/files`,
          body: file,
        });
      }, */
      queryFn: async ({ task, file }) => {
        console.log(file);
        const res = await fetch(
          'http://localhost:8000' +
            `/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}/files`,
          {
            method: 'PUT',
            headers: {},
            body: file,
          }
        );

        const data = await res.json();

        return { data };
      },
      async onQueryStarted({ task }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoardById', task.boardId, (draft) => {
              Object.assign(draft.tasks[task.id], data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteFile: builder.mutation({
      queryFn: async ({ task, file }) => {
        console.log(task);
        console.log(file);
        const res = await fetch(
          'http://localhost:8000' +
            `/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}/files/${file}`,
          {
            method: 'DELETE',
            headers: {},
          }
        );

        const data = await res.json();

        return { data };
      },
      async onQueryStarted({ task, file }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log(data);
        dispatch(
          boardsApi.util.updateQueryData('loadBoardById', task.boardId, (draft) => {
            Object.assign(draft.tasks[task.id], data);
          })
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadFileMutation, useDeleteFileMutation } = filesApi;
