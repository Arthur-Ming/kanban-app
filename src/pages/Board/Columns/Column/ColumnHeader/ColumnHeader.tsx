import { IColumn } from 'interfaces';
import ColumnRemoval from '../ColumnRemoval';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { AiFillEdit as UpdateIcon } from 'react-icons/ai';
import ColumnUpdate from '../ColumnUpdate';

interface OwnProps {
  column: IColumn;
}

type Props = OwnProps;

const ColumnHeader = ({ column }: Props) => {
  return (
    <div className={styles.header}>
      <Routes>
        <Route path={`columns/${column.id}/update`} element={<ColumnUpdate column={column} />} />
        <Route
          path="/*"
          element={
            <div className={styles.update}>
              <h4 className={styles.title}>{column.title}</h4>
              <ColumnRemoval column={column} />
              <Link to={`columns/${column.id}/update`}>
                <UpdateIcon />
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default ColumnHeader;
