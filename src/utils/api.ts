import fetchJson from './fetch-json';

const resource = {
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
};

const BASE = 'http://localhost:8000';

export const buildURL = (path: string) => `${BASE}/${path}`;

export const apiRoutes = {
  boards: () => `${resource.boards}`,
  boardById: (boardId: string) => `${apiRoutes.boards()}/${boardId}`,
  columns: (boardId: string) => `${apiRoutes.boardById(boardId)}/${resource.columns}`,
  columnById: (boardId: string, columnId: string) => `${apiRoutes.columns(boardId)}/${columnId}`,
  tasks: (boardId: string, columnId: string) =>
    `${apiRoutes.columnById(boardId, columnId)}/${resource.tasks}`,
  tasksById: (boardId: string, columnId: string, taskId: string) =>
    `${apiRoutes.tasks(boardId, columnId)}/${taskId}`,
};

export const api = {
  get: (route: string) => fetchJson(route),
  post: async <T>(route: string, body: T) =>
    await fetchJson(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    }),
  delete: (route: string) =>
    fetch(route, {
      method: 'DELETE',
    }),
};
