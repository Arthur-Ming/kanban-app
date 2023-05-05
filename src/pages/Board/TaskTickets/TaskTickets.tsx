import TaskTicket from './TaskTicket';
import { TaskId } from 'interfaces';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  taskIds: TaskId[];
  boardId: string;
};

const TaskTicketList = ({ taskIds, boardId }: Props) => (
  <>
    {taskIds.map((taskId, index) => (
      <Draggable key={taskId} draggableId={taskId} index={index}>
        {(provided) => (
          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <TaskTicket key={taskId} taskId={taskId} boardId={boardId} />
          </li>
        )}
      </Draggable>
    ))}
  </>
);

export default TaskTicketList;
