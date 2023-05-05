import { ColumnId } from 'interfaces';
import Column from './Column';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  columnIds: ColumnId[];
  boardId: string;
};

const Columns = ({ columnIds, boardId }: Props) => {
  return (
    <>
      {columnIds.map((columnId: string, index) => (
        <Draggable key={columnId} draggableId={columnId} index={index}>
          {(provided) => {
            return (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Column columnId={columnId} boardId={boardId} />
              </li>
            );
          }}
        </Draggable>
      ))}
    </>
  );
};

export default Columns;
