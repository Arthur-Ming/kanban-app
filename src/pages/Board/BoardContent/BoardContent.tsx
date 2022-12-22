import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import { connect } from 'react-redux';
import { boardByIdSelector } from 'redux/selectors';
import { RootState } from 'redux/store';
import ColumnCreater from '../ColumnCreater';

interface OwnProps {
  boardId: string;
}

interface StateProps {
  board: IBoard;
}

type TProps = StateProps & OwnProps;

const BoardContent = ({ board }: TProps) => (
  <div className={styles.container}>
    <h4 className={styles.title}>{board.title}</h4>
    <div className={styles.columns}>
      <Columns columnIds={board.columnIds} />
      <ColumnCreater />
    </div>
  </div>
);

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  board: boardByIdSelector(state, props),
});

export default connect(mapStateToProps)(BoardContent);
