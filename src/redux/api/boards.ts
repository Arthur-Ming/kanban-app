import { api, apiParams, apiRoutes } from './api';
import {
  addBoard,
  addBoards,
  columnsOrderChange,
  deleteBoard,
  updateBoard,
} from 'redux/reducer/boards';
import { addColumns } from 'redux/reducer/columns';
import { addTasks } from 'redux/reducer/tasks';
import { separateBoard } from 'utils/separateBoard';
import { IBoard, IColumn, ICreateBoardBody, IFile, IPopulatedBoard, ITask } from '../../interfaces';
import { addFiles } from 'redux/reducer/files';

const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadBoards: builder.query<IBoard[], null>({
      query: () => apiRoutes.boards(),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoards(data));
      },
    }),
    loadBoardById: builder.query<
      { files: IFile[]; tasks: ITask[]; columns: IColumn[]; board: IBoard },
      string
    >({
      query: (boardId) => apiRoutes.boardById(boardId),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: populatedBoard } = await queryFulfilled;
        const { tasks, columns, board, files } = populatedBoard;
        dispatch(addFiles(files));
        dispatch(addTasks(tasks));
        dispatch(addColumns(columns));
        dispatch(addBoard(board));
      },

      transformResponse: (response: IPopulatedBoard) => separateBoard(response),
    }),
    createBoard: builder.mutation<IBoard, ICreateBoardBody>({
      query: (body) => apiParams.post(apiRoutes.boards(), body),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoard(data));
      },
    }),
    updateBoard: builder.mutation({
      query: ({ board, body }) => apiParams.put(apiRoutes.boardById(board.id), body),
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
      query: (board) => apiParams.delete(apiRoutes.boardById(board.id)),
      async onQueryStarted(board, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteBoard(board));
      },
    }),
    columnsOrder: builder.mutation({
      query: ({ board, body }) => apiParams.put(apiRoutes.boardById(board.id), body),
      async onQueryStarted({ board, body }, { dispatch, queryFulfilled }) {
        const newColumns = [...board.columns];
        newColumns.splice(body.sourceIndex, 1);
        newColumns.splice(body.destinationIndex, 0, body.draggableId);

        dispatch(
          columnsOrderChange({
            boardId: board.id,
            newOrderedColumns: newColumns,
          })
        );

        await queryFulfilled;
      },
    }),
  }),
  overrideExisting: false,
});

/*
 board: IBoard;
        sourceIndex: number;
        destinationIndex: number;
        draggableId: string;
*/

export const {
  useLoadBoardsQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useLoadBoardByIdQuery,
  useColumnsOrderMutation,
} = boardsApi;
