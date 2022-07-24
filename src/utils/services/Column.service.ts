import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IColumn, INewColumn, IResponseNewColumn, IUpdateColumn } from '../../interfaces';

export const ColumnService = {
  async getAll(boardId: string) {
    return axios
      .get<IColumn[]>(pathRoutes.columns.getAll.absolute(boardId))
      .then((data) => data.data);
  },
  async getOneById(boardId: string, columnId: string) {
    return axios
      .get<IColumn>(pathRoutes.columns.getOneById.absolute(boardId, columnId))
      .then((data) => data.data);
  },
  async create(boardId: string, { title }: INewColumn) {
    return axios
      .post<IResponseNewColumn>(pathRoutes.columns.create.absolute(boardId), {
        title,
      })
      .then((data) => data.data);
  },
  async updateOneById(boardId: string, columnId: string, column: IUpdateColumn) {
    return axios
      .put<IColumn>(pathRoutes.columns.getOneById.absolute(boardId, columnId), column)
      .then((data) => data.data);
  },
  async deleteOneById(boardId: string, columnId: string) {
    return axios
      .delete(pathRoutes.columns.deleteOneById.absolute(boardId, columnId))
      .then((data) => data.data);
  },
};
