import TaskCreation from 'pages/Board/TaskCreation';
import styles from './index.module.scss';
import { ColumnId, IColumn } from 'interfaces';
import TaskTickets from '../../TaskTickets';
import ColumnHeader from './ColumnHeader';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { columnByIdSelector } from 'redux/selectors/columns';
import { Route, Routes } from 'react-router';
import CreationTicket from 'components/CreationTicket';
import ColumnRemoval from './ColumnRemoval';

type StateProps = {
  column?: IColumn;
};

type OwnProps = {
  columnId: ColumnId;
};

type Props = StateProps & OwnProps;

const Column = ({ column }: Props) => {
  return (
    <div className={styles.box}>
      <div
        style={{
          height: '20px',
          position: 'relative',
        }}
      >
        {column && <ColumnRemoval boardId={column.boardId} columnId={column.id} />}
      </div>

      {column && <TaskTickets taskIds={column.tasks} />}
      {column?.id && (
        <Routes>
          <Route
            path={`columns/${column.id}/tasks/create`}
            element={<TaskCreation boardId={column.boardId} columnId={column.id} />}
          />
          <Route
            path="/*"
            element={
              <CreationTicket path={`columns/${column.id}/tasks/create`} label="создать таск" />
            }
          />
        </Routes>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  column: columnByIdSelector(state, props),
});

export default connect(mapStateToProps)(Column);
