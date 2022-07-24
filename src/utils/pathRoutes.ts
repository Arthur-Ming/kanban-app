import { join } from 'path-browserify';

export const pathRoutes = {
  // root: 'https://pure-cove-88107.herokuapp.com',
  // root: 'https://young-inlet-01140.herokuapp.com',
  root: 'http://localhost:8000',
  docs: () => join(pathRoutes.root, 'docs'),
  auth: {
    relative: '',
    signup: {
      relative: 'signup',
      absolute: () => `${pathRoutes.root}/${pathRoutes.auth.signup.relative}`,
    },
    signin: {
      relative: 'signin',
      absolute: () => `${pathRoutes.root}/${pathRoutes.auth.signin.relative}`,
    },
  },
  user: {
    relative: 'users',
    getAll: {
      relative: '',
      absolute: () => `${pathRoutes.root}/${pathRoutes.user.relative}`,
    },
    getOneById: {
      relative: '',
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.user.relative}/${id}`,
    },
    updateOneById: {
      relative: 'users',
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.user.relative}/${id}`,
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.user.relative}/${id}`,
    },
  },
  board: {
    relative: 'boards',
    getAll: {
      relative: '',
      absolute: () => `${pathRoutes.root}/${pathRoutes.board.relative}`,
    },
    getOneById: {
      relative: '',
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.board.relative}/${id}`,
    },
    create: {
      relative: '',
      absolute: () => `${pathRoutes.root}/${pathRoutes.board.relative}`,
    },
    updateOneById: {
      relative: '',
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.board.relative}/${id}`,
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.board.relative}/${id}`,
    },
  },
  columns: {
    relative: (boardId = ':id') => {
      return `${pathRoutes.root}/${pathRoutes.board.relative}/${boardId}/columns`;
    },
    getAll: {
      relative: '',
      absolute: (boardId = ':id') => pathRoutes.columns.relative(boardId),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        `${pathRoutes.columns.relative(boardId)}/${columnId}`,
    },
    create: {
      relative: '',
      absolute: (boardId = ':id') => pathRoutes.columns.relative(boardId),
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        `${pathRoutes.columns.relative(boardId)}/${columnId}`,
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        `${pathRoutes.columns.relative(boardId)}/${columnId}`,
    },
  },
  task: {
    relative: (boardId = ':id', columnId = ':id') =>
      `${pathRoutes.columns.relative(boardId)}/${columnId}`,
    getAll: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id') =>
        `${pathRoutes.task.relative(boardId, columnId)}/tasks`,
    },
    getOneById: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id', taskId = ':id') =>
        `${pathRoutes.task.relative(boardId, columnId)}/tasks/${taskId}`,
    },
    create: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id') =>
        `${pathRoutes.task.relative(boardId, columnId)}/tasks`,
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id', taskId = ':id') =>
        `${pathRoutes.task.relative(boardId, columnId)}/tasks/${taskId}`,
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id', taskId = ':id') =>
        `${pathRoutes.task.relative(boardId, columnId)}/tasks/${taskId}`,
    },
  },
  file: {
    relative: 'file',
    getOneByTaskIdAndFileName: {
      relative: '',
      absolute: (taskId = ':id', fileName = 'name') =>
        join(pathRoutes.root, pathRoutes.file.relative, taskId, fileName),
    },
    upload: {
      relative: '',
      absolute: () => join(pathRoutes.root, pathRoutes.file.relative),
    },
  },
};
