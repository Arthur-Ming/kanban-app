import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import fetchJson from 'utils/fetch-json';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { getToken } from 'utils/cookies';

const BASE_URL = 'http://localhost:8000';

const resource = {
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
  users: 'users',
};

export const apiRoutesAlt = {
  boards: {
    url: () => `${BASE_URL}/${resource.boards}`,
    isProtected: true,
  },
  boardById: {
    url: (boardId: string) => `${apiRoutes.boards()}/${boardId}`,
    isProtected: true,
  },
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

const getHeaders = (token?: string) => {
  const headers = new Headers();
  if (token) headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json;charset=utf-8');
  return headers;
};

interface IHttpClientQuery {
  url: string;
  token?: string;
  isProtected?: boolean;
}
export interface IHttpClientMutation extends IHttpClientQuery {
  body?: unknown;
}
//quiryParams
export const httpClient = {
  fileUpload: <T>(url: string, body: T) => ({
    url,
    method: 'POST',
    headers: getHeaders(),
    body,
  }),

  get: ({ url, isProtected }: IHttpClientQuery) => ({
    url,
    method: 'GET',
    isProtected,
  }),
  post: <T>({ url, body, token }: IHttpClientMutation) => ({
    url,
    method: 'POST',
    /*  headers: getHeaders(token), */
    body,
  }),

  put: <T>({ url, body, token }: IHttpClientMutation) => ({
    url,
    method: 'PUT',
    headers: getHeaders(token),
    body,
  }),
  delete: ({ url, token }: IHttpClientMutation) => ({
    url,
    headers: getHeaders(token),
    method: 'DELETE',
  }),
};

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) =>
  async <T>({ url, isProtected, ...rest }: IHttpClientMutation) => {
    /*   const request = new Request('https://jsonplaceholder.typicode.com/posts', {
      method: 'post',
      body: JSON.stringify({
        title: 'my post',
        body: 'some content',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }); */

    try {
      let token;
      if (isProtected) token = getToken();
      const result = await fetchJson(url, { headers: getHeaders(token), ...rest });
      return { data: result };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
});
