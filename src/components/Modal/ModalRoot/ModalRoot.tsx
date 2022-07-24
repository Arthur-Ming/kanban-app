import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

interface Props {
  children: React.ReactNode;
}

const ModalRoot = ({ children }: Props) => {
  if (!modalRoot) return <div>No modal root</div>;
  return createPortal(children, modalRoot);
};

export default ModalRoot;
