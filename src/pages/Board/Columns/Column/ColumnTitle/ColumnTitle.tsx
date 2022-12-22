import { FormEventHandler } from 'react';
import ColumnTitleEdit from '../ColumnHeaderEdit';
import styles from './styles.module.scss';
import { AiFillEdit as EditIcon } from 'react-icons/ai';

interface OwnProps {
  title: string;
  isTitleEdit: boolean;
  onChange: FormEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  onKeyDown: FormEventHandler<HTMLInputElement>;
  onCancel: () => void;
  onClick: () => void;
}

type TProps = OwnProps;

const ColumnTitle = ({
  title,
  isTitleEdit,
  onChange,
  onSubmit,
  onKeyDown,
  onCancel,
  onClick,
}: TProps) => {
  return isTitleEdit ? (
    <ColumnTitleEdit
      value={title}
      onChange={onChange}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      onCancel={onCancel}
    />
  ) : (
    <div className={styles.container} onClick={onClick}>
      <h3 className={styles.title}>{title}</h3>
      <EditIcon className={styles.edit} />
    </div>
  );
};

export default ColumnTitle;
