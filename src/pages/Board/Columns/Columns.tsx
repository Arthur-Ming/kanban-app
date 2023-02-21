import { ColumnId } from 'interfaces';
import Column from './Column';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  columnIds: ColumnId[];
};

const Columns = ({ columnIds }: Props) => (
  <>
    {columnIds.map((columnId: string, index) => (
      <Draggable key={columnId} draggableId={columnId} index={index}>
        {(provided) => {
          return (
            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Column columnId={columnId} />
            </li>
          );
        }}
      </Draggable>
    ))}
  </>
);

export default Columns;
