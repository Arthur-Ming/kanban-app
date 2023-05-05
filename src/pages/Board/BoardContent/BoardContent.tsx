import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import ColumnCreation from '../ColumnCreation';
import { Route, Routes } from 'react-router';
import CreationTicket from 'components/CreationTicket';
import BoardHeader from './BoardHeader';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useColumnsOrderMutation, useLoadBoardByIdQuery } from 'redux/api/boards';
import { useTasksOrderMutation } from 'redux/api/columns';
import { memo } from 'react';

export const DragItemsType = {
  TASK_CARD: 'task_card',
  COLUMNS: 'columns',
};

type Props = {
  boardId: string;
};

const BoardContent = ({ boardId }: Props) => {
  const [columnsOrderChange] = useColumnsOrderMutation();
  const [tasksOrderChange] = useTasksOrderMutation();
  const { board } = useLoadBoardByIdQuery(boardId, {
    selectFromResult: ({ data }) => ({
      board: data?.board,
    }),
  });
  console.log('board');
  if (!board) return <div>!!!</div>;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (Number(destination.droppableId) === source.index && destination.index === source.index) {
      return;
    }

    if (!board) {
      return;
    }

    if (type === 'tasks') {
      tasksOrderChange({
        boardId: board.id,
        columnId: source.droppableId,
        body: {
          source: {
            index: source.index,
          },
          destination: {
            index: destination.index,
            columnId: destination.droppableId,
          },
          taskId: draggableId,
        },
      });
    }

    if (type === 'columns') {
      columnsOrderChange({
        board,
        body: {
          source: {
            index: source.index,
          },
          destination: { index: destination.index },
          columnId: draggableId,
        },
      });
    }
  };
  if (!board) return <div>Not found</div>;
  return (
    <div className={styles.box}>
      <BoardHeader board={board} />
      <div className={styles.body}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={board.id} direction="horizontal" type={DragItemsType.COLUMNS}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ul className={styles.columns}>
                  <Columns columnIds={board.columns} boardId={board.id} />
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.creation}>
          <Routes>
            <Route path="columns/create" element={<ColumnCreation board={board} />} />
            <Route
              path="/*"
              element={<CreationTicket label="создать колонку" path="columns/create" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default memo(BoardContent);
