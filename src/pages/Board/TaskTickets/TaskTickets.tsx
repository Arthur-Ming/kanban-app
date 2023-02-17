import TaskTicket from './TaskTicket';
import styles from './index.module.scss';
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
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <TaskTicket key={taskId} taskId={taskId} />
          </div>
        )}
      </Draggable>
    ))}
  </>
);

export default TaskTicketList;
