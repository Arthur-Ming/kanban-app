import { api, httpClient, boardRoutes, columnRoutes } from './api';
import { separateBoard } from 'utils/separateBoard';
import { IBoard, IColumn, ICreateBoardBody, IFile, IPopulatedBoard, ITask } from '../../interfaces';

export class FetchError extends Error {
  status: number | undefined;

  constructor(status?: number, message = '') {
    super(message);
    this.status = status;
    console.log(this.message);
  }
}

export const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadBoards: builder.query<IBoard[], void>({
      query: () => {
        const { getUrl, isProtected } = boardRoutes.boards;
        return httpClient.get({ url: getUrl(), isProtected });
      },
      providesTags: ['Boards'],
    }),

    loadBoardById: builder.query<
      { tasks: { [key: string]: ITask }; columns: { [key: string]: IColumn }; board: IBoard },
      string
    >({
      query: (boardId) => {
        const { getUrl, isProtected } = boardRoutes.boardById;
        return httpClient.get({ url: getUrl(boardId), isProtected });
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log(data);
        } catch (error) {}
      },

      transformResponse: (response: IPopulatedBoard) => separateBoard(response),
    }),

    createBoard: builder.mutation<IBoard, ICreateBoardBody>({
      query: (body) => {
        const { getUrl, isProtected } = boardRoutes.boards;
        return httpClient.post({ url: getUrl(), body, isProtected });
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoards', undefined, (draft) => {
              draft.push(data);
            })
          );
        } catch (error) {}
      },
    }),

    updateBoard: builder.mutation({
      query: ({ board, body }) => {
        const { getUrl, isProtected } = boardRoutes.boardById;
        return httpClient.put({ url: getUrl(board.id), body, isProtected });
      },
      invalidatesTags: ['Boards'],
      async onQueryStarted({ board, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData('loadBoardById', board.id, (draft) => {
            Object.assign(draft.board, body);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    removeBoard: builder.mutation({
      query: (board) => {
        const { getUrl, isProtected } = boardRoutes.boardById;
        return httpClient.delete({ url: getUrl(board.id), isProtected });
      },
      async onQueryStarted(board, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('loadBoards', undefined, (draft) => {
              const index = draft.findIndex(({ id }) => id === board.id);
              index !== -1 && draft.splice(index, 1);
            })
          );
        } catch (error) {}
      },
    }),

    columnsOrder: builder.mutation({
      query: ({ board, body }) => {
        const { getUrl, isProtected } = columnRoutes.order;
        return httpClient.put({
          url: getUrl(board.id),
          body,
          isProtected,
        });
      },
      async onQueryStarted({ board, body }, { dispatch, queryFulfilled }) {
        const newColumns = [...board.columns];
        newColumns.splice(body.source.index, 1);
        newColumns.splice(body.destination.index, 0, body.columnId);

        try {
          await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoadBoardsQuery,
  useLoadBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useRemoveBoardMutation,
  useColumnsOrderMutation,
} = boardsApi;
