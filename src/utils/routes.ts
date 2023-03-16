import { join } from 'path-browserify';

export const Xroutes = {
  base: '',
  boards: {
    base: {
      relative: 'boards',
      absolute: () => join(Xroutes.base, Xroutes.boards.base.relative),
    },
    byId: {
      relative: ':boardId',
      absolute: (boardId = ':boardId') => join(Xroutes.boards.base.absolute(), boardId),
    },
    create: {
      relative: 'create',
      absolute: () => join(Xroutes.boards.base.absolute(), Xroutes.boards.create.relative),
    },
    update: {
      relative: 'update',
      absolute: () => join(Xroutes.boards.base.absolute(), Xroutes.boards.update.relative),
    },
  },
  columns: {
    base: {
      relative: 'columns',
      absolute: () => join(Xroutes.base, Xroutes.columns.base.relative),
    },
    byId: {
      relative: ':columnId',
      absolute: (columnId = ':columnId') => join(Xroutes.columns.base.absolute(), columnId),
    },
    create: {
      relative: 'create',
      absolute: () => join(Xroutes.columns.base.absolute(), Xroutes.columns.create.relative),
    },
    update: {
      relative: 'update',
      absolute: () => join(Xroutes.columns.base.absolute(), Xroutes.columns.update.relative),
    },
  },
  tasks: {
    base: {
      relative: 'tasks',
      absolute: () => join(Xroutes.base, Xroutes.tasks.base.relative),
    },
    byId: {
      relative: ':taskId',
      absolute: (taskId = ':taskId') => join(Xroutes.tasks.base.absolute(), taskId),
    },
    create: {
      relative: 'create',
      absolute: () => join(Xroutes.tasks.base.absolute(), Xroutes.tasks.create.relative),
    },
    update: {
      relative: 'update',
      absolute: () => join(Xroutes.tasks.base.absolute(), Xroutes.tasks.update.relative),
    },
    content: {
      relative: 'content',
      absolute: (taskId = ':taskId') =>
        join(Xroutes.tasks.byId.absolute(taskId), Xroutes.tasks.content.relative),
    },
  },
};

export const routes = {
  base: '',
  boards: {
    base: 'boards',
    create: 'create',
    byId: (id = ':boardId') => `boards/${id}`,
    update: 'update',
  },

  columns: {
    base: 'columns',
    create: 'columns/create',
  },
  tasks: {
    base: 'tasks',
    create: (id = ':columnId') => `columns/${id}/tasks/create`,
    byId: (columnId = ':columnId', taskId = ':taskId') => `columns/${columnId}/tasks/${taskId}`,
  },
  users: {
    register: 'register',
    login: 'login',
  },
  errorPage: 'errorPage',
};
