import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IColumn } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTaskMutation } from 'redux/api/tasks';

interface OwnProps {
  column?: IColumn;
}

type Props = OwnProps;

const TaskCreation = ({ column }: Props) => {
  const navigate = useNavigate();
  const onCancel = () => {
    column && navigate(`/boards/${column.boardId}`);
  };

  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  useOutside<HTMLDivElement>(wrapperRef, `/boards/${column?.boardId}`);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  return (
    <div ref={wrapperRef}>
      <CreationForm
        onSubmit={(body) => createTask({ column, body })}
        onCancel={onCancel}
        isLoading={isLoading}
        placeholder="bdbdb"
      />
    </div>
  );
};

export default TaskCreation;
