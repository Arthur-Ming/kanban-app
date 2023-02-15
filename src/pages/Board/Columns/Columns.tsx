import { ColumnId } from 'interfaces';
import Column from './Column';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

type Props = {
  columnIds: ColumnId[];
};

const Columns = ({ columnIds }: Props) => {
  const [isInteractiveElementsDisabled, setIsInteractiveElementsDisabled] = useState(true);

  return (
    <>
      {columnIds.map((columnId: string, index) => (
        <Draggable
          key={columnId}
          draggableId={columnId}
          index={index}
          /* disableInteractiveElementBlocking={isInteractiveElementsDisabled} */
        >
          {(provided, snapshot) => {
            return (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Column columnId={columnId} />
              </li>
            );
          }}
        </Draggable>
        /* <Column key={columnId} columnId={columnId} /> */
      ))}
    </>
  );
};

export default Columns;
