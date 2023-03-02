import { createApi } from '@reduxjs/toolkit/query/react';
import fetchJson from 'utils/fetch-json';
import { getToken } from 'utils/cookies';

const BASE_URL = 'http://localhost:8000';

const resource = {
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
  users: 'users',
};
interface IRoutes {
  [endpoint: string]: {
    getUrl: (...params: string[]) => string;
    isProtected: boolean;
  };
}

export const boardRoutes: IRoutes = {
  boards: {
    getUrl: () => `${BASE_URL}/${resource.boards}`,
    isProtected: true,
  },
  boardById: {
    getUrl: (boardId = ':boardId') => `${boardRoutes.boards.getUrl()}/${boardId}`,
    isProtected: true,
  },
};

export const columnRoutes = {
  columns: {
    getUrl: (boardId = ':boardId') =>
      `${boardRoutes.boardById.getUrl(boardId)}/${resource.columns}`,
    isProtected: true,
  },
  columnById: {
    getUrl: (boardId = ':boardId', columnId = ':columnId') =>
      `${columnRoutes.columns.getUrl(boardId)}/${columnId}`,
    isProtected: true,
  },
  order: {
    getUrl: (boardId = ':boardId') =>
      `${boardRoutes.boardById.getUrl(boardId)}/${resource.columns}/order`,
    isProtected: true,
  },
};

export const taskRoutes = {
  tasks: {
    getUrl: (boardId = ':boardId', columnId = ':columnId') =>
      `${columnRoutes.columnById.getUrl(boardId, columnId)}/${resource.tasks}`,
    isProtected: true,
  },
  tasksById: {
    getUrl: (boardId = ':boardId', columnId = ':columnId', taskId = ':taskId') =>
      `${taskRoutes.tasks.getUrl(boardId, columnId)}/${taskId}`,
    isProtected: true,
  },
  order: {
    getUrl: (boardId = ':boardId', columnId = ':columnId') =>
      `${columnRoutes.columnById.getUrl(boardId, columnId)}/${resource.tasks}/order`,
    isProtected: true,
  },
};

export const userRoutes = {
  base: `${BASE_URL}/${resource.boards}`,
  users: {
    getUrl: () => `${BASE_URL}/${resource.users}`,
    isProtected: true,
  },
  userById: {
    getUrl: (userId = ':userId') => `${userRoutes.users.getUrl()}/${userId}`,
    isProtected: true,
  },
  registration: {
    getUrl: () => `${userRoutes.users.getUrl()}/register`,
    isProtected: false,
  },
  login: {
    getUrl: () => `${userRoutes.users.getUrl()}/login`,
    isProtected: false,
  },
};

const getHeaders = (token?: string) => {
  const headers = new Headers();
  if (token) headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json;charset=utf-8');
  return headers;
};

interface IHttpClient<T> {
  url: string;
  isProtected?: boolean;
  body?: T;
}

interface IRequest<T> extends IHttpClient<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export const httpClient = {
  fileUpload: <T>({ url, body }: IHttpClient<T>): IRequest<T> => ({
    url,
    method: 'POST',
    body,
  }),

  get: <T>({ url, isProtected }: IHttpClient<T>): IRequest<T> => ({
    url,
    method: 'GET',
    isProtected,
  }),
  post: <T>({ url, body, isProtected }: IHttpClient<T>): IRequest<T> => ({
    url,
    method: 'POST',
    body,
    isProtected,
  }),

  put: <T>({ url, body, isProtected }: IHttpClient<T>): IRequest<T> => ({
    url,
    method: 'PUT',
    body,
    isProtected,
  }),
  delete: <T>({ url, isProtected }: IHttpClient<T>): IRequest<T> => ({
    url,
    method: 'DELETE',
    isProtected,
  }),
};

interface IError {
  response?: {
    status?: number;
    data?: string;
  };
  message: string;
  status?: number;
}

const fetchQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) =>
  async <T>({ url, isProtected, method, body, ...rest }: IRequest<T>) => {
    try {
      let token;
      if (isProtected) token = getToken();
      const result = await fetchJson<T>({
        url: baseUrl + url,
        body,
        config: { method, headers: getHeaders(token), ...rest },
      });

      return { data: result };
    } catch (error: unknown) {
      const err = error as IError;

      return {
        error: {
          status: err?.response?.status || err?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
