import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IColumn, IFetchError } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const [createTask, { isLoading, isError, error, isSuccess }] = useCreateTaskMutation();

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to create task', {
      toastId: errorStatus,
    });
  }

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
