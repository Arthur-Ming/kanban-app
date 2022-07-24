import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IBoard, IColumn, INewBoard, IUpdatedBoardParams } from '../../interfaces';

export const BoardService = {
  async getAll() {
    const { data } = await axios.get<IBoard[]>(pathRoutes.board.getAll.absolute());
    return data;
  },
  async getOneById(id: string) {
    return axios.get<IBoard>(pathRoutes.board.getOneById.absolute(id)).then((data) => data.data);
  },
  async create(params: INewBoard) {
    return axios.post<IBoard>(pathRoutes.board.create.absolute(), params).then((data) => data.data);
  },
  async updateOneById(id: string, params: IUpdatedBoardParams) {
    return axios
      .put<IBoard>(pathRoutes.board.getOneById.absolute(id), params)
      .then((data) => data.data);
  },
  // async updateColumnsOneById(id: string, columns: IColumn[]) {
  //   return axios
  //     .put<IBoard>(pathRoutes.board.getOneById.absolute(id), { columns: columns })
  //     .then((data) => data.data);
  // },
  async deleteOneById(id: string) {
    return axios.delete(pathRoutes.board.deleteOneById.absolute(id)).then((data) => data.data);
  },
};
