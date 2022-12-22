import { ITask, IUpdateTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

export default function (task?: ITask) {
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [newDescription = '', setValue] = useState(task?.description);

  const onClick = () => setIsEdit(true);

  const onChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };
  const onCancelClick = () => {
    setValue(task?.description);
    setIsEdit(false);
  };

  const onSaveClick = () => {
    setValue(newDescription.trim());
    if (task) {
      /*   mutate({
        title: task.title,
        order: task.order,
        description: newDescription || ' ',
        userId: task.userId,
        boardId,
        columnId,
      }); */
    }
  };

  return {
    newDescription,
    isEdit,
    handlers: {
      onClick,
      onChange,
      onCancelClick,
      onSaveClick,
    },
  };
}
