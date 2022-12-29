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

export interface IAction {
  type: string;
}

export interface IActionCallApi extends IAction {
  CallAPI: string;
}

export interface IRequestAction extends IAction {
  key: string;
  error: unknown | null;
}

export interface ISetColumnsAction extends IAction {
  columns: IColumn[];
}

export interface IAddColumnAction extends IAction {
  column: IColumn;
}

export interface IAddTaskAction extends IAction {
  task: ITask;
}

export interface ISetTasksAction extends IAction {
  tasks: ITask[];
}

export interface ISetBoards extends IAction {
  boards: IBoard[];
}
export interface IAddBoard extends IAction {
  board: IBoard;
}

export interface IDeleteBoard extends IAction {
  boardId: string;
}

export interface IDeleteColumn extends IAction {
  columnId: string;
  boardId: string;
}
export interface IDeleteTask extends IAction {
  taskId: string;
  columnId: string;
  boardId: string;
}

export interface IGetBoardByIdAction extends IAction {
  error: unknown | null;
  data: IBoard | null;
}

export interface ICreateBoard extends IAction {
  error: unknown | null;
  data: IBoard | null;
}

export interface ICreateBoardBody {
  title: string;
  description: string;
}

export interface ICreateColumnBody {
  title: string;
}
export interface ICreateTaskBody {
  title: string;
}
