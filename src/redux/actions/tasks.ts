import { IColumn, ICreateTaskBody, ITask } from 'interfaces';
import { api, apiRoutes } from 'utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTask = createAsyncThunk(
  'tasks/create',
  async ({ column, body }: { column: IColumn; body: ICreateTaskBody }) => {
    const { boardId, id: columnId } = column;
    return await api.post(apiRoutes.tasks(boardId, columnId), body);
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (task: ITask) => {
  const { boardId, columnId, id: taskId } = task;
  return await api.delete(apiRoutes.tasksById(boardId, columnId, taskId));
});
