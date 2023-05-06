import { IBoard, IColumn, IFile, IPopulatedBoard, IPopulatedTask, ITask } from 'interfaces';
import { arrToMap } from './arrToMap';

export const separateBoard = (populatedBoard: IPopulatedBoard) => {
  const tasks: IPopulatedTask[] = populatedBoard.columns.map(({ tasks }) => tasks).flat();

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
