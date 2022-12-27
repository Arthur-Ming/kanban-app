import { join } from 'path-browserify';

export const baseRoutes = {
  base: '',
  boards: {
    base: {
      relative: 'boards',
      absolute: () => join(baseRoutes.base, baseRoutes.boards.base.relative),
    },
    byId: {
      relative: ':boardId',
      absolute: (boardId = ':boardId') => join(baseRoutes.boards.base.absolute(), boardId),
    },
    create: {
      relative: 'create',
      absolute: () => join(baseRoutes.boards.base.absolute(), baseRoutes.boards.create.relative),
    },
    update: {
      relative: 'update',
      absolute: () => join(baseRoutes.boards.base.absolute(), baseRoutes.boards.update.relative),
    },
  },
  columns: {
    base: {
      relative: 'columns',
      absolute: () => join(baseRoutes.base, baseRoutes.columns.base.relative),
    },
    byId: {
      relative: ':columnId',
      absolute: (columnId = ':columnId') => join(baseRoutes.columns.base.absolute(), columnId),
    },
    create: {
      relative: 'create',
      absolute: () => join(baseRoutes.columns.base.absolute(), baseRoutes.columns.create.relative),
    },
    update: {
      relative: 'update',
      absolute: () => join(baseRoutes.columns.base.absolute(), baseRoutes.columns.update.relative),
    },
  },
  tasks: {
    base: {
      relative: 'tasks',
      absolute: () => join(baseRoutes.base, baseRoutes.tasks.base.relative),
    },
    byId: {
      relative: ':taskId',
      absolute: (taskId = ':taskId') => join(baseRoutes.tasks.base.absolute(), taskId),
    },
    create: {
      relative: 'create',
      absolute: () => join(baseRoutes.tasks.base.absolute(), baseRoutes.tasks.create.relative),
    },
    update: {
      relative: 'update',
      absolute: () => join(baseRoutes.tasks.base.absolute(), baseRoutes.tasks.update.relative),
    },
    content: {
      relative: 'content',
      absolute: (taskId = ':taskId') =>
        join(baseRoutes.tasks.byId.absolute(taskId), baseRoutes.tasks.content.relative),
    },
  },
};

export const routes = {
  boards: {
    byId: (boardId = ':boardId') => baseRoutes.boards.byId.absolute(boardId),
  },
  tasks: {
    content: (columnId = ':columnId', taskId = ':taskId') =>
      join(
        baseRoutes.columns.byId.absolute(columnId),
        '/',
        baseRoutes.tasks.content.absolute(taskId)
      ),
  },
};
