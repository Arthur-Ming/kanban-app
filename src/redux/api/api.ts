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

// ENV

/*
httpClient.get({
  url: apiRoutes.boardById(boardId),
  token: getToken()
})
*/

const getHeaders = (token?: string) => {
  const headers = new Headers();
  if (token) headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json;charset=utf-8');
  return headers;
};

interface IHttpClientQuery {
  url: string;
  token?: string;
}
interface IHttpClientMutation<T> extends IHttpClientQuery {
  body?: T;
}

export const httpClient = {
  fileUpload: <T>(url: string, body: T) => ({
    url,
    method: 'POST',
    headers: getHeaders(),
    body,
  }),

  get: ({ url, token }: IHttpClientQuery) => ({
    url,
    method: 'GET',
    headers: getHeaders(token),
  }),
  post: <T>({ url, body, token }: IHttpClientMutation<T>) => ({
    url,
    method: 'POST',
    headers: getHeaders(token),
    body,
  }),

  put: <T>({ url, body, token }: IHttpClientMutation<T>) => ({
    url,
    method: 'PUT',
    headers: getHeaders(token),
    body,
  }),
  delete: ({ url, token }: IHttpClientMutation<null>) => ({
    url,
    headers: getHeaders(token),
    method: 'DELETE',
  }),
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({}),
  endpoints: () => ({}),
});
