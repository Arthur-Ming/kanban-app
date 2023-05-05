import { IBoard, IColumn, IFile, IPopulatedBoard, IPopulatedTask, ITask } from 'interfaces';
import { arrToMap } from './arrToMap';

export const separateBoard = (populatedBoard: IPopulatedBoard) => {
  const populatedTasks: IPopulatedTask[] = populatedBoard.columns.map(({ tasks }) => tasks).flat();

  const tasks: ITask[] = populatedTasks.map((task) => ({
    ...task,
    files: task?.files ? task.files.map(({ id }) => id) : [],
  }));

  const columns: IColumn[] = populatedBoard.columns.map(({ tasks, ...rest }) => ({
    ...rest,
    tasks: tasks.map(({ id }) => id),
  }));

  const board: IBoard = {
    ...populatedBoard,
    columns: populatedBoard.columns.map(({ id }) => id),
  };

  return {
    tasks: arrToMap(tasks),
    columns: arrToMap(columns),
    board,
  };
};
