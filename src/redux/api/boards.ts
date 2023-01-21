import { api, apiParams, apiRoutes } from './api';
import { addBoard, addBoards, deleteBoard, updateBoard } from 'redux/reducer/boards';
import { addColumns } from 'redux/reducer/columns';
import { addTasks } from 'redux/reducer/tasks';
import { separateBoard } from 'utils/separateBoard';
import { IBoard, IColumn, ICreateBoardBody, IPopulatedBoard, ITask } from '../../interfaces';

const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadBoards: builder.query<IBoard[], null>({
      query: () => apiRoutes.boards(),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(addBoards(data));
      },
    }),
    loadBoardById: builder.query<{ tasks: ITask[]; columns: IColumn[]; board: IBoard }, string>({
      query: (boardId) => apiRoutes.boardById(boardId),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: populatedBoard } = await queryFulfilled;
        const { tasks, columns, board } = populatedBoard;
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
  }),
  overrideExisting: false,
});

export const {
  useLoadBoardsQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useLoadBoardByIdQuery,
} = boardsApi;
