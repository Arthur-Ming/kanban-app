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

type OwnProps = {
  boardId: string;
};

type StateProps = {
  board?: IBoard;
};

type Props = OwnProps & StateProps;

const BoardContent = ({ board }: Props) => {
  return (
    <div className={styles.container}>
      {board && <BoardHeader board={board} />}
      <div className={styles.columns}>
        {board?.columns && <Columns columnIds={board.columns} />}
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
