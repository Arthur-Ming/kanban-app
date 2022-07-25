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

export interface IColumnWithTaskIds extends IColumn {
  taskIds: string[];
}

export interface IBoard {
  _id: string;
  title: string;
  description: string;
  taskIds: string[];
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
//=================
export interface IAction {
  type: string;
}

export interface IActionCallApi extends IAction {
  CallAPI: string;
}

export interface IGetBoardById extends IActionCallApi {
  error: unknown | null;
  data: ICompleteBoard | null;
}

export interface IColumnsOrderChange extends IActionCallApi {
  boardId: string;
  columnId: string;
  order: number;
}

export interface ICreatTask extends IActionCallApi {
  boardId: string;
  columnId: string;
  title: string;
}

export interface IDeleteColumn extends IActionCallApi {
  boardId: string;
  columnId: string;
}

export interface ICreatColumn extends IActionCallApi {
  boardId: string;
  title: string;
  newColumn: IColumn | null;
}

export interface IDeleteTask extends IActionCallApi {
  boardId: string;
  columnId: string;
  taskId: string;
}
