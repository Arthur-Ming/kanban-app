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
import { useEffect, useState } from 'react';
import boards, { columnsOrderChange } from 'redux/reducer/boards';
import { useDispatch } from 'react-redux';
import { useColumnsOrderMutation } from 'redux/api/boards';

type OwnProps = {
  boardId: string;
};

type StateProps = {
  board?: IBoard;
};

export const DragItemsType = {
  TASK_CARD: 'task_card',
  COLUMN: 'column',
};

type Props = OwnProps & StateProps;

const BoardContent = ({ board }: Props) => {
  const [orderChange] = useColumnsOrderMutation();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    console.log(result);
    if (type !== 'columns') {
      return;
    }

    if (!destination) {
      return;
    }
    if (Number(destination.droppableId) === source.index && destination.index === source.index) {
      return;
    }

    if (!board?.columns) {
      return;
    }

    console.log(result);

    const newColumns = [...board.columns];
    newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, draggableId);

    if (board) {
      orderChange({
        board,
        body: { sourceIndex: source.index, destinationIndex: destination.index, draggableId },
      });
    }
  };
  if (!board) return <div>Not found</div>;
  return (
    <div className={styles.container}>
      {board && <BoardHeader board={board} />}
      <div className={styles.columnsh}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={board.id} direction="horizontal" type={DragItemsType.COLUMN}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ul className={styles.columns}>
                  {/* {board?.columns && <Columns columnIds={board.columns} />} */}
                  <Columns columnIds={board.columns} />
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Routes>
          {board && <Route path="columns/create" element={<ColumnCreation board={board} />} />}
          <Route
            path="/*"
            element={<CreationTicket label="создать колонку" path="columns/create" />}
          />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
});

export default connect(mapStateToProps)(BoardContent);
