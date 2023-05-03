import { IBoard, IColumn, IFile, IPopulatedBoard, IPopulatedTask, ITask } from 'interfaces';

export const separateBoard = (populatedBoard: IPopulatedBoard) => {
  const populatedTasks: IPopulatedTask[] = populatedBoard.columns.map(({ tasks }) => tasks).flat();

  const tasks: ITask[] = populatedTasks.map((task) => ({
    ...task,
    files: task?.files ? task.files.map(({ id }) => id) : [],
  }));
  const files: IFile[] = populatedTasks
    .map((task) => task.files)
    .flat()
    .filter((file) => file !== undefined);

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
    files,
  };
};
