import useColumnTitleEdit from 'hooks/columns/useColumnTitleEdit';
import { IColumn } from 'interfaces';
import ColumnControl from '../ColumnControl';
import ColumnTitleEdit from '../ColumnHeaderEdit';
import styles from './styles.module.scss';

interface OwnProps {
  column: IColumn;
  boardId: string;
}

type TProps = OwnProps;

const ColumnHeader = ({ column, boardId }: TProps) => {
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
