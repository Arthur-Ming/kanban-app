import CreatTask from 'pages/Board/CreatTask';
import styles from './index.module.scss';
import { IColumn } from 'interfaces';
import TaskTickets from '../../TaskTickets';
import ColumnHeader from './ColumnHeader';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { columnByIdSelector } from 'redux/selectors/columns';

type StateProps = {
  column: IColumn;
};

type OwnProps = {
  columnId: string;
};

type Props = StateProps & OwnProps;

const Column = ({ column }: Props) => (
  <div className={styles.box}>
    {/*  <ColumnHeader column={column} /> */}
    <TaskTickets taskIds={column.taskIds} />
    <CreatTask columnId={column.id} />
  </div>
);

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  column: columnByIdSelector(state, props),
});

export default connect(mapStateToProps)(Column);
