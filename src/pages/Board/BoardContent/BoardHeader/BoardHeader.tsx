import { IBoard } from 'interfaces';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import BoardUpdate from '../BoardUpdate';
import { Link } from 'react-router-dom';
import { AiFillEdit as UpdateIcon } from 'react-icons/ai';

type Props = {
  board: IBoard;
};

const BoardHeader = ({ board }: Props) => {
  /* return <h4 className={styles.title}>{board.title}</h4>; */

  return (
    <div className={styles.box}>
      <Routes>
        <Route path={`update`} element={<BoardUpdate board={board} />} />
        <Route
          path="/*"
          element={
            <div className={styles.update}>
              <h4 className={styles.title}>{board.title}</h4>
              <Link to="update">
                <UpdateIcon />
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
};
export default BoardHeader;
