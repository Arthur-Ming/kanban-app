import useColumnTitleEdit from 'hooks/useColumnTitleEdit';
import { IColumn } from 'interfaces';
import ColumnControl from '../ColumnControl';
import ColumnTitleEdit from '../ColumnHeaderEdit';
import styles from './styles.module.scss';

interface IProps {
  column: IColumn;
  boardId: string;
}

const ColumnHeader = ({ column, boardId }: IProps) => {
  const { newTitle = '', isTitleEdit, setIsTitleEdit, handlers } = useColumnTitleEdit(column);
  return (
    <div className={styles.container}>
      {isTitleEdit ? (
        <ColumnTitleEdit
          value={newTitle}
          onChange={handlers.onChange}
          onSubmit={handlers.onSubmit}
          onKeyDown={handlers.onKeyDown}
          onCancel={handlers.onCancel}
        />
      ) : (
        <h3 className={styles.title} onClick={handlers.onClick}>
          {newTitle}
        </h3>
      )}
      <ColumnControl boardId={boardId} columnId={column._id} setIsTitleEdit={setIsTitleEdit} />
    </div>
  );
};

export default ColumnHeader;
