import useColumnTitleEdit from 'hooks/columns/useColumnTitleEdit';
import { IColumn } from 'interfaces';
import ColumnRemove from '../ColumnRemove';
import ColumnTitle from '../ColumnTitle';
import styles from './styles.module.scss';

interface OwnProps {
  columnId: string;
  boardId: string;
  column: IColumn;
}

type TProps = OwnProps;

const ColumnHeader = ({ columnId, boardId, column }: TProps) => {
  const { title, isTitleEdit, handlers } = useColumnTitleEdit(column);
  const { onChange, onSubmit, onKeyDown, onCancel, onClick } = handlers;
  return (
    <div className={styles.container}>
      <ColumnTitle
        title={title}
        isTitleEdit={isTitleEdit}
        onChange={onChange}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onCancel={onCancel}
        onClick={onClick}
      />
      <ColumnRemove boardId={boardId} columnId={columnId} />
    </div>
  );
};

export default ColumnHeader;
