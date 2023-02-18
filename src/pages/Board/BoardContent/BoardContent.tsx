import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import ColumnCreation from '../ColumnCreation';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';

import { Route, Routes } from 'react-router';
import CreationTicket from 'components/CreationTicket';

import BoardHeader from './BoardHeader';
import { boardByIdSelector } from 'redux/selectors/boards';

import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useColumnsOrderMutation } from 'redux/api/boards';
import { useTasksOrderMutation } from 'redux/api/columns';

type OwnProps = {
  boardId: string;
};

type StateProps = {
  board?: IBoard;
};

export const DragItemsType = {
  TASK_CARD: 'task_card',
  COLUMNS: 'columns',
};

type Props = OwnProps & StateProps;

const BoardContent = ({ board }: Props) => {
  const [columnsOrderChange] = useColumnsOrderMutation();
  const [tasksOrderChange] = useTasksOrderMutation();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (Number(destination.droppableId) === source.index && destination.index === source.index) {
      return;
    }

    if (!board?.columns) {
      return;
    }

    if (!board) {
      return;
    }

    if (type === 'tasks') {
      tasksOrderChange({
        boardId: board.id,
        columnId: source.droppableId,
        body: {
          source: {
            index: source.index,
          },
          destination: {
            index: destination.index,
            columnId: destination.droppableId,
          },
          taskId: draggableId,
        },
      });
    }

    if (type === 'columns') {
      /*   columnsOrderChange({
        board,
        body: { sourceIndex: source.index, destinationIndex: destination.index, draggableId },
      }); */
      columnsOrderChange({
        board,
        body: {
          source: {
            index: source.index,
          },
          destination: { index: destination.index },
          columnId: draggableId,
        },
      });
    }
  };
  if (!board) return <div>Not found</div>;
  return (
    <div className={styles.container}>
      {board && <BoardHeader board={board} />}
      <div className={styles.columnsh}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={board.id} direction="horizontal" type={DragItemsType.COLUMNS}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ul className={styles.columns}>
                  <Columns columnIds={board.columns} />
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.wrap}>
          <Routes>
            {board && <Route path="columns/create" element={<ColumnCreation board={board} />} />}
            <Route
              path="/*"
              element={<CreationTicket label="создать колонку" path="columns/create" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
});

export default connect(mapStateToProps)(BoardContent);
