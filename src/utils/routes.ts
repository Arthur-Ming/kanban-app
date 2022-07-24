import { join } from 'path-browserify';

/*
export const xRoutes = {
    root: "/",
    list: {
        relative: "list",
        create: {
            relative: "create",
            absolute: () =>
                xRoutes.root +
                xRoutes.list.relative +
                xRoutes.list.create.relative,
        },
        delete: {
            relative: "",
            absolute: (id = ":id") => xRoutes.root + "/list/delete" + id,
        },
        update: {
            relative: "",
            absolute: (id = ":id") => join(xRoutes.root, "update", id),
        },
    },
};

*/
interface IGetById {
  relative: string;
  absolute: string;
}

export const routes = {
  root: '/',
  boards: {
    relative: 'boards',
    id: (boardId = ':boardId') => `${boardId}`,
    absolute: (boardId = ':boardId') =>
      join(routes.root, routes.boards.relative, routes.boards.id(boardId)),
  },
  columns: {
    relative: 'columns',
    id: (columnId = ':columnId') => `${columnId}`,
    absolute: (boardId = ':boardId', columnId = ':columnId') =>
      join(routes.boards.absolute(boardId), routes.columns.relative, routes.columns.id(columnId)),
  },
  tasks: {
    relative: 'tasks',
    id: (taskId = ':taskId') => `${taskId}`,
    absolute: (boardId = ':boardId', columnId = ':columnId', taskId = ':taskId') =>
      join(
        routes.columns.absolute(boardId, columnId),
        routes.tasks.relative,
        routes.tasks.id(taskId)
      ),
    creat: {
      relative: 'creat-task',
      absolute: (columnId = ':columnId') =>
        join(
          routes.columns.relative,
          routes.columns.id(columnId),
          routes.tasks.relative,
          routes.tasks.creat.relative
        ),
    },
    content: {
      relative: 'task-content',
      absolute: (columnId = ':columnId', taskId = ':taskId') =>
        join(
          routes.columns.relative,
          routes.columns.id(columnId),
          routes.tasks.relative,
          routes.tasks.id(taskId),
          routes.tasks.content.relative
        ),
    },
  },
};
