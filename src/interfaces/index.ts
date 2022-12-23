export interface IBoardBase {
  id: string;
  title: string;
  description: string;
}

export interface IColumnBase {
  id: string;
  boardId: string;
  title: string;
}

export interface IPopulatedBoard extends IBoardBase {
  columns: IPopulatedColumn[];
}
export interface IBoard extends IBoardBase {
  columnIds: string[];
}

export interface IColumn extends IColumnBase {
  taskIds: string[];
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

export interface IAction {
  type: string;
}

export interface IActionCallApi extends IAction {
  CallAPI: string;
}

export interface ISetColumnsAction extends IAction {
  columns: IColumn[];
}

export interface ISetTasksAction extends IAction {
  tasks: ITask[];
}

export interface IGetAllBoards extends IAction {
  error: unknown | null;
  data: IBoard[] | null;
}

export interface IGetBoardByIdAction extends IAction {
  error: unknown | null;
  data: IBoard | null;
}
