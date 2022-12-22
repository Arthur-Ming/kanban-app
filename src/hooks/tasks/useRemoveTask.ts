import { useState } from 'react';
import { useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

export default function (
  columnId: string,
  taskId: string,
  onDelete: (boardId: string, columnId: string, taskId: string) => void
) {
  const { boardId = '' } = useParams();
  const [isRemove, setRemove] = useState(false);

  const onClickOutside = () => {
    setRemove(false);
  };

  const onLabelClick = () => {
    setRemove(true);
  };

  const onCanselClick = () => {
    setRemove(false);
  };

  const onOkClick = () => {
    onDelete(boardId, columnId, taskId);
    setRemove(false);
  };

  return {
    isRemove,
    onLabelClick,
    onClickOutside,
    onOkClick,
    onCanselClick,
  };
}
