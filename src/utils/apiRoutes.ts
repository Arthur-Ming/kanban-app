const resource = {
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
};

export const apiRoutes = {
  root: 'http://localhost:8000',

  boards: () => `${apiRoutes.root}/${resource.boards}`,
  boardById: (boardId: string) => `${apiRoutes.boards()}/${boardId}`,
};
