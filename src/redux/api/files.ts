import { api, httpClient } from './api';
import { addRefToFile, deleteRefToFile } from 'redux/reducer/tasks';
import { addFile, deleteFile } from 'redux/reducer/files';

const filesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: ({ task, file }) =>
        httpClient.fileUpload('http://localhost:8000' + `/tasks/${task.id}/files`, file),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addRefToFile(data));
          dispatch(addFile(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteFile: builder.mutation({
      query: (file) => {
        return httpClient.delete({
          url: 'http://localhost:8000' + `/tasks/${file.taskId}/files/${file.id}`,
        });
      },
      async onQueryStarted(file, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteFile(file));
        dispatch(deleteRefToFile(file));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadFileMutation, useDeleteFileMutation } = filesApi;
