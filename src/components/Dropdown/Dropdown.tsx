import { IoMdClose as CloseIcon } from 'react-icons/io';

import styles from './styles.module.scss';

interface IProps {
  children: React.ReactNode;
  title: string;
  onCloseClick: () => void;
  extraClass?: string;
}

const Dropdown = ({ children, title, onCloseClick, extraClass }: IProps) => (
  <div className={styles.container}>
    <div className={styles.dropdown_wrapper}>
      <div className={styles.dropdown_header}>
        <div>{title}</div>
        <CloseIcon className={styles.close} onClick={onCloseClick} />
      </div>
      {children}
    </div>
  </div>
);

export default Dropdown;
