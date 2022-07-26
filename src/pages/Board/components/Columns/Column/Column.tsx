import CreatTask from 'pages/Board/components/CreatTask';
import styles from './styles.module.scss';
import { IColumn } from 'interfaces';
import Tasks from '../../Tasks';
import ColumnHeader from './ColumnHeader';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { columnByIdSelector } from 'redux/selectors';

interface StateProps {
  column: IColumn;
}

interface OwnProps {
  columnId: string;
  boardId: string;
}

type TProps = StateProps & OwnProps;

const Column = ({ columnId, boardId, column }: TProps) => {
  return (
    <div data-columns-grab-handle className={styles.column} data-column-id={columnId}>
      <div className={styles.wrapper}>
        <ColumnHeader column={column} columnId={columnId} boardId={boardId} />
        <Tasks columnId={columnId} boardId={boardId} />
        <CreatTask columnId={columnId} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  column: columnByIdSelector(state, props),
});

export default connect(mapStateToProps)(Column);
