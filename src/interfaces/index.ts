export interface IBoardBase {
  id: string;
  title: string;
  description: string;
}

export type ColumnId = string;
export type TaskId = string;

export interface IColumnBase {
  id: string;
  boardId: string;
  title: string;
}

export interface IPopulatedBoard extends IBoardBase {
  columns: IPopulatedColumn[];
}
export interface IBoard extends IBoardBase {
  columns: ColumnId[];
}

export interface IColumn extends IColumnBase {
  tasks: TaskId[];
}

export interface IPopulatedColumn extends IColumnBase {
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  boardId: string;
  columnId: string;
}

interface ILANG {
  [key: string]: string;
}

export interface ITEXT {
  [key: string]: ILANG;
}

export interface IUser {
  name: string;
  id: string;
  token: string;
}

export interface IUserRegisterBody {
  email: string;
  name: string;
  password: string;
}

export interface IUserLoginBody {
  email: string;
  password: string;
}

export interface ICreateBoardBody {
  title: string;
  description?: string;
}

export interface IUpdateBoard {
  title: string;
  description?: string;
}

export interface ICreateColumnBody {
  title: string;
}
export interface ICreateTaskBody {
  title: string;
}

export interface ICreationInput {
  title: string;
}

export interface IAction {
  type: string;
}

export interface ISetSessionAction extends IAction {
  isAuth: boolean;
}
