import { IBoard, IColumn, IPopulatedBoard, ITask } from 'interfaces';

export const separateBoard = (populatedBoard: IPopulatedBoard) => {
  const tasks: ITask[] = populatedBoard.columns.map(({ tasks }) => tasks).flat();

  const columns: IColumn[] = populatedBoard.columns.map(({ id, title, boardId, tasks }) => ({
    id,
    title,
    boardId,
    tasks: tasks.map(({ id }) => id),
  }));
  const { id, title, description } = populatedBoard;
  const board: IBoard = {
    id,
    title,
    description,
    columns: populatedBoard.columns.map(({ id }) => id),
  };
  return {
    tasks,
    columns,
    board,
  };
};
