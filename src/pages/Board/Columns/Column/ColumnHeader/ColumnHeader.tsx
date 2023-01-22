import { IColumn } from 'interfaces';
import ColumnRemoval from '../ColumnRemoval';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import ColumnUpdate from '../ColumnUpdate';
import ColumnUpdateLink from '../ColumnUpdateLink';

interface OwnProps {
  column: IColumn;
}

type Props = OwnProps;

const ColumnHeader = ({ column }: Props) => (
  <Routes>
    <Route path={`columns/${column.id}/update`} element={<ColumnUpdate column={column} />} />
    <Route path="/*" element={<ColumnUpdateLink column={column} />} />
  </Routes>
);

export default ColumnHeader;
