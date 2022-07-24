import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IUserResponse, IUserUpdate } from '../../interfaces';

export const UserService = {
  async getAll() {
    return axios.get<IUserResponse[]>(pathRoutes.user.getAll.absolute()).then((data) => data.data);
  },
  async getUserById(id: string) {
    return axios
      .get<IUserResponse>(pathRoutes.user.getOneById.absolute(id))
      .then((data) => data.data);
  },
  async updateUserById(id: string, newData: IUserUpdate) {
    console.log(pathRoutes.user.updateOneById.absolute(id));
    return axios
      .put<IUserUpdate>(pathRoutes.user.updateOneById.absolute(id), newData)
      .then((data) => data.data);
  },
  async deleteUserById(id: string) {
    return axios.delete(pathRoutes.user.deleteOneById.absolute(id)).then((data) => data.data);
  },
};
