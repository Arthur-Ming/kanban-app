import styles from './modal.module.scss';
import cn from 'classnames';
import { Component, MouseEventHandler, RefObject, useRef } from 'react';
import { createPortal } from 'react-dom';
import ModalRoot from './ModalRoot';

interface Props {
  handleClickOutside?: () => void;
  children: React.ReactNode;
  isOpened?: boolean;
}

const Modal: React.FC<Props> = ({ isOpened = true, children, handleClickOutside }) => {
  const modalWrapperRef: RefObject<HTMLDivElement> = useRef(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (modalWrapperRef.current === event.target && handleClickOutside) {
      handleClickOutside();
    }
  };

  return (
    <ModalRoot>
      <div
        className={cn(styles.wrapper, {
          [styles.open]: isOpened,
        })}
        ref={modalWrapperRef}
        onClick={handleClick}
      >
        {children}
      </div>
    </ModalRoot>
  );
};

export default Modal;
