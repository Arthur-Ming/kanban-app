import styles from './index.module.scss';
import Columns from '../Columns';
import { IBoard } from 'interfaces';
import ColumnCreater from '../ColumnCreater';

type Props = {
  board: IBoard;
};

const BoardContent = ({ board }: Props) => (
  <div className={styles.container}>
    <h4 className={styles.title}>{board?.title}</h4>
    <div className={styles.columns}>
      {board && <Columns columnIds={board.columnIds} />}
      <ColumnCreater />
    </div>
  </div>
);

export default BoardContent;
