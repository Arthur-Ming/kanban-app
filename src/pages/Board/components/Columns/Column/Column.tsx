import CreatTask from 'pages/Board/components/CreatTask';
import styles from './styles.module.scss';
import { IColumnWithTasks } from 'interfaces';
import Tasks from '../../Tasks';
import ColumnHeader from './ColumnHeader';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { columnByIdSelector } from 'redux/selectors';

interface IProps {
  columnId: string;
  boardId: string;
  column?: IColumnWithTasks;
}
const Column = ({ columnId, boardId, column }: IProps) => {
  return (
    <div data-columns-grab-handle className={styles.column} data-column-id={columnId}>
      <div className={styles.wrapper}>
        {column && <ColumnHeader column={column} boardId={boardId} />}
        <Tasks columnId={columnId} boardId={boardId} />
        <CreatTask columnId={columnId} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: IProps) => ({
  column: columnByIdSelector(state, props),
});

export default connect(mapStateToProps, null)(Column);
