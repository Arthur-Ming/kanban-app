import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000';

const resource = {
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
  users: 'users',
};

export const apiRoutes = {
  boards: () => `${BASE_URL}/${resource.boards}`,
  boardById: (boardId: string) => `${apiRoutes.boards()}/${boardId}`,
  columns: (boardId: string) => `${apiRoutes.boardById(boardId)}/${resource.columns}`,
  columnById: (boardId: string, columnId: string) => `${apiRoutes.columns(boardId)}/${columnId}`,
  tasks: (boardId: string, columnId: string) =>
    `${apiRoutes.columnById(boardId, columnId)}/${resource.tasks}`,
  tasksById: (boardId: string, columnId: string, taskId: string) =>
    `${apiRoutes.tasks(boardId, columnId)}/${taskId}`,
  users: () => `${BASE_URL}/${resource.users}`,
  userById: (userId: string) => `${BASE_URL}/${resource.users}/${userId}`,
  userRegister: () => `${apiRoutes.users()}/register`,
  userLogin: () => `${apiRoutes.users()}/login`,
};

/*boardsApi = {
   fetchBoards() {
    return httpClient.get({
           url: apiRoutes.boardById(boardId),
           token: getToken()
          });
    },
   fetchBoardById,
   createBoard,
   deleteBoard,
   updateBoard
}
*/
// ENV
/*

 boards: () => apiParams.get({
  url: `${BASE_URL}/${resource.boards}`
 }) ,
 */

/*
httpClient.get({
  url: apiRoutes.boardById(boardId),
  token: getToken()
})

 get: ({
  url,
  token,
  type
}) => ({
    url,
    method: 'GET',
    headers: getHeaders({
       token,
       type
    }),
  }),
*/

/*
{
  url,
  body,
  type,
  withToken
}

*/

const getHeaders = () => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${Cookies.get('token')}`);
  headers.append('Content-Type', 'image/png');
  return headers;
};

export const apiParams = {
  fileUpload: <T>(url: string, body: T) => ({
    url,
    method: 'POST',
    headers: getHeaders(),
    body,
  }),

  get: (url: string) => ({
    url,
    method: 'GET',
    headers: getHeaders(),
  }),
  post: <T>(url: string, body: T) => ({
    url,
    method: 'POST',
    headers: getHeaders(),
    body,
  }),
  put: <T>(url: string, body: T) => ({
    url,
    method: 'PUT',
    headers: getHeaders(),
    body,
  }),
  delete: (url: string) => ({
    url,
    headers: getHeaders(),
    method: 'DELETE',
  }),
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({}),
  endpoints: () => ({}),
});
