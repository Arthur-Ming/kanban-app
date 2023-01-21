import { IBoard } from 'interfaces';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import BoardUpdate from '../BoardUpdate';
import BoardUpdateLink from '../BoardUpdateLink';

type Props = {
  board: IBoard;
};

const BoardHeader = ({ board }: Props) => (
  <div className={styles.box}>
    <Routes>
      <Route path={`update`} element={<BoardUpdate board={board} />} />
      <Route path="/*" element={<BoardUpdateLink board={board} />} />
    </Routes>
  </div>
);

export default BoardHeader;
