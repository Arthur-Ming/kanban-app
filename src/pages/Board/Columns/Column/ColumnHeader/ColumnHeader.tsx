import { IColumn } from 'interfaces';
import ColumnTitle from '../ColumnTitle';
import styles from './index.module.scss';

interface DispatchProps {
  onColumnTitleEdit: (boardId: string, columnId: string, title: string, order: number) => void;
}

interface OwnProps {
  column: IColumn;
}

type TProps = OwnProps & DispatchProps;

const ColumnHeader = ({ column, onColumnTitleEdit }: TProps) => {
  return (
    <div className={styles.container}>
      !!!
      {/*  <ColumnTitle
        title={title}
        isTitleEdit={isTitleEdit}
        onChange={onChange}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onCancel={onCancel}
        onClick={onClick}
      /> */}
      {/*   <ColumnRemove boardId={column.boardId} columnId={column.id} /> */}
    </div>
  );
};

export default ColumnHeader;
