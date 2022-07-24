import axios from 'axios';
import { ICreatTask } from 'hooks/tasks/useCreatCardForm';
import { pathRoutes } from 'utils/pathRoutes';
import { ITask, IUpdateTask } from '../../interfaces';

export const TaskService = {
  async getAll(boardId: string, columnId: string) {
    return axios
      .get<ITask[]>(pathRoutes.task.getAll.absolute(boardId, columnId))
      .then((data) => data.data);
  },
  async getOneById(boardId: string, columnId: string, taskId: string) {
    return axios
      .get<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId))
      .then((data) => data.data);
  },
  async create({ boardId, columnId, body }: ICreatTask) {
    try {
      const { data } = await axios.post<ITask>(pathRoutes.task.create.absolute(boardId, columnId), {
        ...body,
      });
      return data;
    } catch (error) {
      throw Error('err');
    }
  },
  async updateOneById(boardId: string, columnId: string, taskId: string, updatedTask: IUpdateTask) {
    return await axios
      .put<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId), {
        ...updatedTask,
      })
      .then((data) => data.data);
  },

  async deleteOneById(boardId: string, columnId: string, taskId: string) {
    return axios
      .delete(pathRoutes.task.deleteOneById.absolute(boardId, columnId, taskId))
      .then((data) => data.data);
  },
};
