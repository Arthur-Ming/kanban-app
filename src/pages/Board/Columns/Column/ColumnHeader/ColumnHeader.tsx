import useColumnTitleEdit from 'hooks/columns/useColumnTitleEdit';
import { IColumn } from 'interfaces';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import ColumnRemove from '../ColumnRemove';
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
  const { title, isTitleEdit, handlers } = useColumnTitleEdit(column, onColumnTitleEdit);
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
      {/*   <ColumnRemove boardId={column.boardId} columnId={column.id} /> */}
    </div>
  );
};

export default ColumnHeader;
