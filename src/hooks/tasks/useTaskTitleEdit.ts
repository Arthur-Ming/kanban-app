import { ITask, IUpdateTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';

export default function (task: ITask) {
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [newTitle, setValue] = useState(task.title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const onKeyDown: FormEventHandler<HTMLInputElement> = (event) => {
    if ((event as { key?: string }).key === 'Enter') {
      onSubmit();
    }
  };

  const onCancel = () => {
    setValue(task.title);
    setIsTitleEdit(false);
  };

  const onSubmit = () => {
    if (task && newTitle.trim()) {
    }
    setValue(newTitle.trim());
    setIsTitleEdit(false);
  };

  const onClick = () => setIsTitleEdit(true);

  return {
    newTitle,
    isTitleEdit,
    setIsTitleEdit,
    handlers: {
      onKeyDown,
      onChange,
      onClick,
      onCancel,
      onSubmit,
    },
  };
}
