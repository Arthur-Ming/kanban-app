import TaskCreation from 'pages/Board/TaskCreation';
import styles from './index.module.scss';
import TaskTickets from '../../TaskTickets';
import ColumnHeader from './ColumnHeader';
import { Route, Routes } from 'react-router';
import CreationTicket from 'components/CreationTicket';
import { Droppable } from 'react-beautiful-dnd';
import cl from 'classnames';
import { useLoadBoardByIdQuery } from 'redux/api/boards';
import { memo } from 'react';

export const DragItemsType = {
  TASKS: 'tasks',
  COLUMN: 'column',
};

type Props = {
  columnId: string;
  boardId: string;
};

const Column = ({ columnId, boardId }: Props) => {
  const { column } = useLoadBoardByIdQuery(boardId, {
    selectFromResult: ({ data }) => ({
      column: data && data.columns && data.columns[columnId],
    }),
  });
  console.log(`column ${columnId}`);
  if (!column) return <div>No data</div>;

  return (
    <div
      className={cl(styles.box, {
        [styles.box_nolist]: !column.tasks.length,
      })}
    >
      <ColumnHeader column={column} />
      <Droppable droppableId={column.id} type={DragItemsType.TASKS}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul className={styles.list}>
              <TaskTickets taskIds={column.tasks} boardId={column.boardId} />
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>

      <Routes>
        <Route
          path={`columns/${column.id}/tasks/create`}
          element={<TaskCreation column={column} />}
        />
        <Route
          path="/*"
          element={
            <CreationTicket path={`columns/${column.id}/tasks/create`} label="создать таск" />
          }
        />
      </Routes>
    </div>
  );
};

export default memo(Column);
