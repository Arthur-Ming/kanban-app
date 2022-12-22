import { useEffectOnce } from 'hooks/useEffectOnce';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';

export interface IGetBoardById {
  boardId: string;
}
export interface IGetColumnById extends IGetBoardById {
  columnId: string;
}

export interface ICreatTask extends IGetColumnById {
  body: {
    title: string;
    description: string;
    userId: string;
  };
}
export interface IGetTaskById extends IGetColumnById {
  taskId: string;
}

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

const useCreatCardForm = (submitValue: (title: string) => void) => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const { boardId = '' } = useParams();

  useEffectOnce(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.focus();
    }
  });

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const textarea: HTMLTextAreaElement | null = textareaEl.current;
    if (textarea) {
      const value = textarea.value.trim();
      if (value) {
        submitValue(value);
        textarea.value = '';
      }
    }
  };

  const onKeyDown = (event: { key?: string; preventDefault: () => void }) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  const onCloseClick = () => navigate(`/boards/${boardId}`);

  return {
    handlers: {
      onSubmit,
      onKeyDown,
      onCloseClick,
    },
    isDisabled: false,
    textareaEl,
  };
};

export default useCreatCardForm;
