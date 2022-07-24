export interface ITask {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: IFiles[] | [];
}

export interface IColumn {
  _id: string;
  boardId: string;
  title: string;
  order: number;
}

export interface IColumnWithTasks extends IColumn {
  taskIds: string[];
}

export interface IBoard {
  _id: string;
  title: string;
  description: string;
}

export interface IBoardWithColumnIds extends IBoard {
  columnIds: string[];
}

export interface ICompleteBoard extends IBoard {
  columns: IColumn[] | [];
}

export interface INewBoard {
  title: string;
  description: string;
}

export interface IUpdatedBoardParams {
  description: string;
  title: string;
}

export interface IResponseNewColumn {
  id: string;
  title: string;
  order: number;
}

export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface ICreateTask {
  boardId: string;
  columnId: string;
  body: INewTask;
}

export interface INewColumn {
  title: string;
}

interface ILANG {
  [key: string]: string;
}

export interface ITEXT {
  [key: string]: ILANG;
}

export interface IUser {
  name: string;
  login: string;
  password: string;
}
export interface IUpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IUpdateColumn {
  title: string;
  order: number;
}

export interface IUserResponse {
  id: string;
  login: string;
  name: string;
}

export interface IUserUpdate {
  name: string;
  login: string;
  password: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
}

export interface IFiles {
  filename: string;
  fileSize: number;
}
