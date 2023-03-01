import { api, httpClient, boardRoutes, columnRoutes } from './api';
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
        const { getUrl, isProtected } = boardRoutes.boards;
        return httpClient.get({ url: getUrl(), isProtected });
      },

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
        const { getUrl, isProtected } = boardRoutes.boardById;
        return httpClient.get({ url: getUrl(boardId), isProtected });
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: populatedBoard } = await queryFulfilled;
        console.log(populatedBoard);
        if (populatedBoard) {
          const { tasks, columns, board, files } = populatedBoard;
          console.log(tasks);
          dispatch(addFiles(files));
          dispatch(addTasks(tasks));
          dispatch(addColumns(columns));
          dispatch(addBoard(board));
        }
      },

      transformResponse: (response: IPopulatedBoard) => separateBoard(response),
    }),
    createBoard: builder.mutation<IBoard, ICreateBoardBody>({
      query: (body) => {
        const { getUrl, isProtected } = boardRoutes.boards;
        return httpClient.post({ url: getUrl(), body, isProtected });
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoard(data));
      },
    }),
    updateBoard: builder.mutation({
      query: ({ board, body }) => {
        const { getUrl, isProtected } = boardRoutes.boardById;
        return httpClient.put({ url: getUrl(board.id), body, isProtected });
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
        const { getUrl, isProtected } = boardRoutes.boardById;
        return httpClient.delete({ url: getUrl(board.id), isProtected });
      },
      async onQueryStarted(board, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(deleteBoard(board));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    columnsOrder: builder.mutation({
      query: ({ board, body }) => {
        const { getUrl, isProtected } = columnRoutes.order;
        console.log(getUrl(board.id));
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

        dispatch(
          updateColumnsOrder({
            boardId: board.id,
            newOrderedColumns: newColumns,
          })
        );
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
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
