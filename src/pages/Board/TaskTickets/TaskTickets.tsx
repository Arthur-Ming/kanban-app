import TaskTicket from './TaskTicket';
import { TaskId } from 'interfaces';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  tasks: TaskId[];
};

const TaskTicketList = ({ tasks }: Props) => (
  <>
    {tasks.map((taskId: string, index) => (
      <Draggable key={taskId} draggableId={taskId} index={index}>
        {(provided) => (
          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <TaskTicket key={taskId} taskId={taskId} />
          </li>
        )}
      </Draggable>
    ))}
  </>
);

export default TaskTicketList;
