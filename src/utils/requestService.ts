export enum CRUD {
  read = 'read',
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export const buildKey = (path: string, method: keyof typeof CRUD = CRUD.read) =>
  `${path}/${method}`;

export const requestKey = {
  read: (path: string) => `${path}`,
  create: (path: string) => `${path}/${CRUD.create}`,
  delete: (path: string) => `${path}/${CRUD.delete}`,
  update: (path: string) => `${path}/${CRUD.update}`,
};
