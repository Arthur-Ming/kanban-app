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
import { Droppable } from 'react-beautiful-dnd';
import cl from 'classnames';

export const DragItemsType = {
  TASKS: 'tasks',
  COLUMN: 'column',
};

type StateProps = {
  column?: IColumn;
};

type OwnProps = {
  columnId: ColumnId;
};

type Props = StateProps & OwnProps;

const Column = ({ column }: Props) => {
  if (!column) return <div>No data</div>;

  return (
    <div
      className={cl(styles.box, {
        [styles.box_nolist]: !column.tasks.length,
      })}
    >
      <ColumnHeader column={column} />
      <Droppable droppableId={column.id} type={DragItemsType.TASKS}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul className={styles.list}>
              <TaskTickets tasks={column.tasks} />
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>

      <Routes>
        <Route
          path={`columns/${column.id}/tasks/create`}
          element={<TaskCreation column={column} />}
        />
        <Route
          path="/*"
          element={
            <CreationTicket path={`columns/${column.id}/tasks/create`} label="создать таск" />
          }
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  column: columnByIdSelector(state, props),
});

export default connect(mapStateToProps)(Column);
