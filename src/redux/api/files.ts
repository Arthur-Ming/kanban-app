import { api, apiParams } from './api';
import { addRefToFile } from 'redux/reducer/tasks';
import { addFile } from 'redux/reducer/files';

const filesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    filesUpload: builder.mutation({
      query: ({ task, file }) =>
        apiParams.fileUpload('http://localhost:8000' + `/files/${task.id}/upload`, file),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addRefToFile(data));
        dispatch(addFile(data));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFilesUploadMutation } = filesApi;
