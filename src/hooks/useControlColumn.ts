import { useState } from 'react';

export default function (boardId: string, columnId: string, onDeleteColumn: () => void) {
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const onClickOutside = (ev: MouseEvent) => {
    const target: HTMLDivElement | null = (ev.target as HTMLDivElement)?.closest(`[ data-id]`);

    if (!target || target.dataset.id !== columnId) {
      onCloseClick();
    }
  };

  const onOpenClick = () => {
    window.addEventListener('click', onClickOutside, true);
    setIsControlOpen(true);
  };

  const onCloseClick = () => {
    window.removeEventListener('click', onClickOutside, true);
    setIsControlOpen(false);
  };
  const onEditClick = () => {
    onCloseClick();
  };
  const onRemoveClick = () => {
    setIsRemove(true);
  };

  const onCancelClick = () => {
    setIsRemove(false);
    setIsControlOpen(true);
    window.addEventListener('click', onClickOutside, true);
  };

  return {
    isControlOpen,
    isRemove,
    handlers: {
      onOpenClick,
      onCloseClick,
      onEditClick,
      onRemoveClick,
      onCancelClick,
      onDeleteColumn,
    },
  };
}
