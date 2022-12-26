import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import ColumnCreation from '../ColumnCreation';

type Props = {
  board: IBoard;
};

const BoardContent = ({ board }: Props) => (
  <div className={styles.container}>
    <h4 className={styles.title}>{board?.title}</h4>
    <div className={styles.columns}>
      {board && <Columns columnIds={board.columnIds} />}
      <ColumnCreation />
    </div>
  </div>
);

export default BoardContent;
