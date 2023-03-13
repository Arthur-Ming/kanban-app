import { IColumn, IFetchError } from 'interfaces';
import { Route, Routes } from 'react-router';
import { toast } from 'react-toastify';
import { useUpdateColumnMutation } from 'redux/api/columns';
import ColumnRemoval from '../ColumnRemoval';
import ColumnUpdate from '../ColumnUpdate';
import ColumnUpdateLink from '../ColumnUpdateLink';
import styles from './index.module.scss';

interface OwnProps {
  column: IColumn;
}

type Props = OwnProps;

const ColumnHeader = ({ column }: Props) => {
  const [update, { isError, error }] = useUpdateColumnMutation();
  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }

    toast.error('failed to update column', {
      toastId: errorStatus,
    });
  }

  return (
    <div className={styles.box}>
      <Routes>
        <Route
          path={`columns/${column.id}/update`}
          element={<ColumnUpdate column={column} update={update} />}
        />
        <Route path="/*" element={<ColumnUpdateLink column={column} />} />
      </Routes>
      <ColumnRemoval column={column} />
    </div>
  );
};

export default ColumnHeader;
