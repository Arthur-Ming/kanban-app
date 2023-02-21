import { IColumn } from 'interfaces';
import { Route, Routes } from 'react-router';
import ColumnRemoval from '../ColumnRemoval';
import ColumnUpdate from '../ColumnUpdate';
import ColumnUpdateLink from '../ColumnUpdateLink';
import styles from './index.module.scss';

interface OwnProps {
  column: IColumn;
}

type Props = OwnProps;

const ColumnHeader = ({ column }: Props) => (
  <div className={styles.box}>
    <Routes>
      <Route path={`columns/${column.id}/update`} element={<ColumnUpdate column={column} />} />
      <Route path="/*" element={<ColumnUpdateLink column={column} />} />
    </Routes>
    <ColumnRemoval column={column} />
  </div>
);

export default ColumnHeader;
