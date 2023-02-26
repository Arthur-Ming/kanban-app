import { api, httpClient, apiRoutes, apiRoutesAlt } from './api';
import {
  addBoard,
  addBoards,
  updateColumnsOrder,
  deleteBoard,
  updateBoard,
} from 'redux/reducer/boards';
import { addColumns } from 'redux/reducer/columns';
import { addTasks } from 'redux/reducer/tasks';
import { separateBoard } from 'utils/separateBoard';
import { IBoard, IColumn, ICreateBoardBody, IFile, IPopulatedBoard, ITask } from '../../interfaces';
import { addFiles } from 'redux/reducer/files';
import { getToken } from 'utils/cookies';

export class FetchError extends Error {
  status: number | undefined;

  constructor(status?: number, message = '') {
    super(message);
    this.status = status;
    console.log(this.message);
  }
}

const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadBoards: builder.query<IBoard[], null>({
      query: () => {
        const { url, isProtected } = apiRoutesAlt.boards;
        return httpClient.get({ url: url(), isProtected: false });
      },
      /*   queryFn: async () => {
        try {
          const data = await httpClient.getAlt({ url: apiRoutes.boards(), token: getToken() });

          return { data };
         eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      }, */

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data) dispatch(addBoards(data));
        } catch (error) {}
      },
    }),
    loadBoardById: builder.query<
      { files: IFile[]; tasks: ITask[]; columns: IColumn[]; board: IBoard },
      string
    >({
      query: (boardId) => {
        return httpClient.get({ url: apiRoutes.boardById(boardId), token: getToken() });
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: populatedBoard } = await queryFulfilled;
        const { tasks, columns, board, files } = populatedBoard;
        dispatch(addFiles(files));
        dispatch(addTasks(tasks));
        dispatch(addColumns(columns));
        dispatch(addBoard(board));
      },

      /*  transformResponse: (response: IPopulatedBoard) => separateBoard(response), */
    }),
    createBoard: builder.mutation<IBoard, ICreateBoardBody>({
      query: (body) => {
        return httpClient.post({
          url: apiRoutes.boards(),
          body: JSON.stringify(body),
          isProtected: false,
        });
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoard(data));
      },
    }),
    updateBoard: builder.mutation({
      query: ({ board, body }) => {
        return httpClient.put({ url: apiRoutes.boardById(board.id), body, token: getToken() });
      },
      async onQueryStarted({ board, body }, { dispatch, queryFulfilled }) {
        dispatch(updateBoard(Object.assign({}, board, body)));
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(updateBoard(board));
          throw err;
        }
      },
    }),
    deleteBoard: builder.mutation({
      query: (board) => {
        return httpClient.delete({ url: apiRoutes.boardById(board.id), token: getToken() });
      },
      async onQueryStarted(board, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteBoard(board));
      },
    }),
    columnsOrder: builder.mutation({
      query: ({ board, body }) => {
        return httpClient.put({
          url: apiRoutes.boardById(board.id) + '/columns/order',
          body,
          token: getToken(),
        });
      },
      async onQueryStarted({ board, body }, { dispatch, queryFulfilled }) {
        const newColumns = [...board.columns];
        newColumns.splice(body.source.index, 1);
        newColumns.splice(body.destination.index, 0, body.columnId);

        dispatch(
          updateColumnsOrder({
            boardId: board.id,
            newOrderedColumns: newColumns,
          })
        );

        const { data } = await queryFulfilled;
        console.log(data);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoadBoardsQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useLoadBoardByIdQuery,
  useColumnsOrderMutation,
} = boardsApi;
